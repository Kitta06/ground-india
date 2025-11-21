import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Sources from './pages/Sources'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/Login'
import Signup from './pages/Signup'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <Router>
                        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] transition-colors duration-200">
                            <Navbar />
                            <main className="flex-grow container mx-auto px-4 py-8">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/sources" element={<Sources />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                </Routes>
                            </main>
                            <footer className="bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#404040] py-6 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                <p>© 2024 Ground-India. All rights reserved.</p>
                            </footer>
                        </div>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
