import { useState, useContext } from 'react';
import { Zap, Crown, LogIn, UserPlus } from 'lucide-react';
import AuthContext from '../context/AuthContext';




const Home = ({ onLoginClick, onRegisterClick }) => {
    const { user } = useContext(AuthContext);
    if (user) {
        return null;
    }
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-8">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Shorten Your Links, <span className="text-indigo-600 dark:text-indigo-400">Boost Your Impact</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Create shorter, shareable URLs instantly. Track clicks and manage all your links from one dashboard.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-700">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Free</h2>
                            </div>

                            <p className="text-gray-500 dark:text-gray-400 mb-6">Perfect for getting started</p>

                            <div className="mb-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
                                <div className="text-center">
                                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">100</span>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Short URLs generation</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Custom short links
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Click tracking
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Analytics dashboard
                                </li>
                            </ul>

                            <div className="flex gap-3">
                                <button
                                    onClick={onLoginClick}
                                    className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center justify-center gap-2"
                                >
                                    <LogIn className="h-5 w-5" />
                                    Sign In
                                </button>
                                <button
                                    onClick={onRegisterClick}
                                    className="flex-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 py-3 rounded-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <UserPlus className="h-5 w-5" />
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden opacity-60 relative">
                        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                            Coming Soon
                        </div>
                        <div className="p-8 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <Crown className="h-8 w-8 text-yellow-300" />
                                <h2 className="text-2xl font-bold">Premium</h2>
                            </div>

                            <p className="text-indigo-100 mb-6">For power users and teams</p>

                            <div className="mb-8 bg-indigo-900 bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                                <div className="text-center">
                                    <span className="text-4xl font-bold text-blue-500">Unlimited</span>
                                    <p className="text-indigo-100 text-sm mt-1 text-blue-500">Short URLs generation</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Everything in Free
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Unlimited links
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Team collaboration
                                </li>
                            </ul>

                            <button disabled className="w-full bg-white dark:bg-indigo-900/40 bg-opacity-20 text-gray-800 py-3 rounded-lg font-medium cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;