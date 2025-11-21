import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User } from 'lucide-react';
import axios from 'axios';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            // Create user account
            await axios.post('/api/v1/users/signup', {
                email,
                password,
                is_active: true,
                is_superuser: false
            });

            setSuccess(true);

            // Auto-login after successful signup
            const loginSuccess = await login(email, password);
            if (loginSuccess) {
                navigate('/');
            }
        } catch (err) {
            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Failed to create account. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join Ground India for personalized news</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-6 text-sm text-center">
                        Account created successfully! Logging you in...
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
