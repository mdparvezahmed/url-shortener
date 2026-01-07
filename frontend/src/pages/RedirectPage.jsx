import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getOriginalUrl } from '../services/api';
import { Loader2 } from 'lucide-react';

const RedirectPage = () => {
    const { shortcode } = useParams();
    const [status, setStatus] = useState('loading'); // loading, error
    const hasRedirected = useRef(false);

    useEffect(() => {
        const fetchAndRedirect = async () => {
            if (hasRedirected.current) return;
            hasRedirected.current = true;

            try {
                const data = await getOriginalUrl(shortcode);
                
                window.location.href = data.originalUrl;
            } catch (error) {
                console.error('Error fetching URL:', error);
                setStatus('error');
            }
        };

        if (shortcode) {
            fetchAndRedirect();
        }
    }, [shortcode]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Looking up your link...</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Not Found
                </h1>
            </div>
        );
    }

    // Show loading state while redirecting
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
            <div className="text-center">
                <Loader2 className="h-12 w-12 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
            </div>
        </div>
    );
};

export default RedirectPage;
