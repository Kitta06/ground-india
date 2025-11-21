import { Link } from 'react-router-dom'
import { Newspaper, Search, Moon, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <nav className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#404040] sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 text-gray-900 dark:text-white font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Newspaper size={28} className="text-blue-500" />
                    <span className="text-2xl tracking-tight">Ground-India</span>
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                        Home
                    </Link>
                    <Link to="/sources" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                        Sources
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#2d2d2d] rounded-lg px-3 py-2 border border-gray-200 dark:border-[#404040] focus-within:border-blue-500 transition-colors">
                        <Search size={18} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-gray-900 dark:text-white text-sm outline-none w-40 placeholder-gray-500"
                        />
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#404040] transition-all border border-gray-200 dark:border-[#404040]"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">Welcome</span>
                            <button
                                onClick={logout}
                                className="bg-gray-100 dark:bg-[#2d2d2d] text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#404040] hover:text-gray-900 dark:hover:text-white transition-all border border-gray-200 dark:border-[#404040]"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/login"
                                className="text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg"
                            >
                                Subscribe
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
