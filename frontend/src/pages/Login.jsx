import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to access your personalized news feed</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-semibold hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
