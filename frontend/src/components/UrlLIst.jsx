import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Trash2, ExternalLink, Calendar, BarChart2, Copy, Check } from 'lucide-react';
import { fetchUrls, deleteUrl as deleteUrlApi } from '../services/api';


const UrlList = ({ newUrl, onDelete, onUrlCountChange }) => {
    // Data state
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // UI state
    const [copiedId, setCopiedId] = useState(null);
    const [expandedUrls, setExpandedUrls] = useState(new Set());
    
    const { user } = useContext(AuthContext);

    // Constants
    const URL_PREVIEW_LENGTH = 50;
    const COPY_FEEDBACK_DURATION = 2000;

    // Fetch URLs on component mount
    useEffect(() => {
        loadUrls();
    }, [user]);

    // Add newly created URL to list
    useEffect(() => {
        if (newUrl) {
            setUrls((prev) => [newUrl, ...prev]);
        }
    }, [newUrl]);

    /**
     * Load all URLs from API
     */
    const loadUrls = async () => {
        try {
            const data = await fetchUrls(user.token);
            setUrls(data);
        } catch (error) {
            console.error('Failed to fetch URLs:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete URL by ID
     */
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this URL?')) return;
        
        try {
            await deleteUrlApi(id, user.token);
            
            // Update local state
            const newUrls = urls.filter((url) => url._id !== id);
            setUrls(newUrls);
            
            // Notify parent components
            if (onUrlCountChange) onUrlCountChange(newUrls.length);
            if (onDelete) onDelete();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete URL: ' + (error.response?.data?.message || error.message));
        }
    };

    /**
     * Copy URL to clipboard with feedback
     */
    const handleCopy = async (url, id) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), COPY_FEEDBACK_DURATION);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    /**
     * Toggle expand/collapse state for long URLs
     */
    const toggleExpand = (id) => {
        setExpandedUrls(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    /**
     * Truncate URL for display
     */
    const truncateUrl = (url) => {
        if (url.length <= URL_PREVIEW_LENGTH) return url;
        return url.substring(0, URL_PREVIEW_LENGTH) + '...';
    };

    /**
     * Format date for display
     */
    const formatDate = (date) => {
        if (!date) return 'Just now';
        try {
            return new Date(date).toLocaleDateString();
        } catch {
            return 'Just now';
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading your links...</div>;
    }

    if (urls.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-12 text-center">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No links created yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Use the form above to shorten your first link.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Your Recent Links
            </h3>

            {urls.map((url) => (
                <div key={url._id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline text-lg truncate">
                                    {url.shortUrl}
                                </a>
                                <button
                                    onClick={() => handleCopy(url.shortUrl, url._id)}
                                    className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                                    title="Copy link"
                                >
                                    {copiedId === url._id ? <Check className="h-4 w-4 text-green-600 dark:text-green-400" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                            <div className="text-sm mb-2 w-full overflow-hidden">
                                {expandedUrls.has(url._id) ? (
                                    <div className="w-full">
                                        <p className="text-gray-500 dark:text-gray-400 break-all">
                                            {url.originalUrl}
                                        </p>
                                        <button
                                            onClick={() => toggleExpand(url._id)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs mt-1"
                                        >
                                            Show less
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <p className="text-gray-500 dark:text-gray-400 truncate">
                                            {truncateUrl(url.originalUrl)}
                                        </p>
                                        {url.originalUrl.length > URL_PREVIEW_LENGTH && (
                                            <button
                                                onClick={() => toggleExpand(url._id)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs mt-1"
                                            >
                                                Show more
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(url.createdAt)}
                                </span>
                                <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300 font-medium">
                                    <BarChart2 className="h-3 w-3" />
                                    {url.clicks} visits
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(url._id)}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors self-end sm:self-center"
                            title="Delete Link"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UrlList;
