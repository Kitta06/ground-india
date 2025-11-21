import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a] py-20 px-4 border-b border-gray-200 dark:border-[#404040] transition-colors duration-200">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-200">
                    See every side of every news story.
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto transition-colors duration-200">
                    Read the news from multiple perspectives. See through media bias with reliable news from local and international sources.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link to="/signup">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
                            Get Started
                        </button>
                    </Link>

                    <button className="bg-transparent border-2 border-gray-600 dark:border-gray-400 text-gray-900 dark:text-white font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-lg">
                        Learn More
                    </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex items-center justify-center gap-8 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500">★★★★★</span>
                        <span>5 TIMES</span>
                    </div>
                    <div className="text-gray-400">|</div>
                    <div>As featured on Forbes, Mashable, USA Today</div>
                </div>
            </div>
        </div>
    );
}
