import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link2, Copy, Check, ArrowRight } from 'lucide-react';
import PremiumLimitModal from './PremiumLimitModal';
import { shortenUrl } from '../services/api';
import { MAX_FREE_URLS } from '../constant/constant';





const CreateUrlForm = ({ onUrlCreated, urlCount = 0 }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [createdUrl, setCreatedUrl] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [copied, setCopied] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    const { user } = useContext(AuthContext);

    const COPY_FEEDBACK_DURATION = 2000; // 2 seconds

    const isPremium = user?.type === 'premium';
    const hasReachedLimit = !isPremium && urlCount >= MAX_FREE_URLS;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCreatedUrl(null);

        if (hasReachedLimit) {
            setShowPremiumModal(true);
            return;
        }
        setLoading(true);
        try {
            const data = await shortenUrl(originalUrl, user.token);
            setCreatedUrl(data);
            setOriginalUrl('');
            if (onUrlCreated) {
                onUrlCreated(data);
            }


        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(createdUrl.shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);

        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    }

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Shorten a new URL
                    </h3>
                    {!isPremium && (
                        <div className="flex items-center gap-2 text-sm bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full">
                            <span className="font-medium text-indigo-700 dark:text-indigo-300">{urlCount} / {MAX_FREE_URLS}</span>
                            <span className="text-indigo-600 dark:text-indigo-400">URLs used</span>
                        </div>
                    )}
                    {isPremium && (
                        <div className="flex items-center gap-2 text-sm bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1.5 rounded-full">
                            <span className="font-medium text-yellow-700 dark:text-yellow-300">⭐ Premium</span>
                            <span className="text-yellow-600 dark:text-yellow-400">Unlimited URLs</span>
                        </div>
                    )}
                </div>

                {hasReachedLimit && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4 text-sm text-yellow-800 dark:text-yellow-300">
                        <p className="font-semibold mb-1">Free plan limit reached</p>
                        <p>You've created {MAX_FREE_URLS} URLs. Upgrade to Premium to create unlimited links.</p>
                        <button
                            onClick={() => setShowPremiumModal(true)}
                            className="mt-2 text-yellow-700 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-200 font-medium underline"
                        >
                            View Premium Benefits
                        </button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="Paste your long URL here (e.g., https://example.com/very/long/path)"
                        className="flex-1 px-4 py-3 border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading || hasReachedLimit}
                        className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        {loading ? 'Shortening...' : (
                            <>
                                Shorten URL <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>

                {createdUrl && (
                    <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                        <div className="truncate w-full">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your shortened URL is ready:</p>
                            <a href={createdUrl.shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-lg">
                                {createdUrl.shortUrl}
                            </a>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${copied
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4" /> Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" /> Copy
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            <PremiumLimitModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
        </>
    );
};

export default CreateUrlForm;
