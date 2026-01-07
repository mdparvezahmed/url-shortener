import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link as LinkIcon, LogOut } from 'lucide-react';




const Header = ({onLoginClick, onRegisterClick})=>{
    const {user, Logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const name = user?.email ? user.email.split('@')[0] : 'User';

    const handleLogout = ()=>{
        Logout();
        navigate("/");
    }
    return (
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div>
                            <LinkIcon className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
                            URL Shortener
                        </span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        {user ? (<div className="flex items-center gap-4">
                            <span className="text-gray-600 dark:text-gray-300 hidden sm:block">Welcome, {name}</span>
                            <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                            >
                                    <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>):(<div className="flex items-center gap-4">
                                <button 
                                onClick={onLoginClick}
                                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                                >
                                    Login
                                </button>
                                <button 
                                onClick={onRegisterClick}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
                                >
                                    Get Started
                                </button>
                        </div>)}
                    </nav>
                </div>
            </div>
        </header>
    );
}


export default Header;