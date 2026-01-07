import { X, Crown, Zap } from 'lucide-react';

//premiumLimitModal card

const PremiumLimitModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="bg-linear-to-r from-yellow-400 to-orange-500 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Crown className="h-8 w-8 text-white" />
                        <h2 className="text-2xl font-bold text-white">Upgrade to Premium</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-8">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">You've reached your limit!</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            You've created 100 URLs on the Free plan. Upgrade to Premium to create unlimited links.
                        </p>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Unlimited URLs</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Create as many links as you need</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Advanced Analytics</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Get detailed insights on your links</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Priority Support</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Get help when you need it</p>
                            </div>
                        </div>
                    </div>

                    <button
                        disabled
                        className="w-full bg-yellow-500 dark:bg-yellow-600 text-white py-3 rounded-lg font-medium cursor-not-allowed opacity-75"
                    >
                        Coming Soon
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full mt-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        Continue Browsing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumLimitModal;
