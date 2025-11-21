const categories = [
    'All',
    'Politics',
    'Business & Markets',
    'Technology',
    'Health & Medicine',
    'Environment & Climate',
    'Sports',
    'Entertainment'
];

export default function CategoryNav({ activeCategory, onCategoryChange }) {
    return (
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#404040] sticky top-16 z-40 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${activeCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2d2d2d]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
