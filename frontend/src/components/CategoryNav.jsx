import { Newspaper, Building2, Cpu, Heart, Leaf, Trophy, Film, Globe } from 'lucide-react'

const categories = [
    { name: 'All', icon: Globe },
    { name: 'Politics', icon: Newspaper },
    { name: 'Business & Markets', icon: Building2 },
    { name: 'Technology', icon: Cpu },
    { name: 'Health & Medicine', icon: Heart },
    { name: 'Environment & Climate', icon: Leaf },
    { name: 'Sports', icon: Trophy },
    { name: 'Entertainment', icon: Film }
];

export default function CategoryNav({ activeCategory, onCategoryChange }) {
    return (
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#404040] sticky top-16 z-40 transition-colors duration-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
                    {categories.map(({ name, icon: Icon }) => (
                        <button
                            key={name}
                            onClick={() => onCategoryChange(name)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${activeCategory === name
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d] hover:scale-105'
                                }`}
                        >
                            <Icon size={16} />
                            <span>{name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
