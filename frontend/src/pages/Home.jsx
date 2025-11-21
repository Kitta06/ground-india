import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Hero from '../components/Hero'
import CategoryNav from '../components/CategoryNav'
import ArticleCard from '../components/ArticleCard'
import ArticleSkeleton from '../components/ArticleSkeleton'

const fetchArticles = async () => {
    const { data } = await axios.get('/api/v1/articles/')
    return data
}

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('All')
    const { data: articles, isLoading, error } = useQuery('articles', fetchArticles)

    // Filter articles by category
    const filteredArticles = articles?.filter(article => {
        if (activeCategory === 'All') return true
        // Map category names
        const categoryMap = {
            'Business & Markets': 'Business',
            'Health & Medicine': 'Health',
            'Environment & Climate': 'Environment'
        }
        const mappedCategory = categoryMap[activeCategory] || activeCategory
        return article.category === mappedCategory
    })

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-red-500 text-lg">Error loading news</p>
                <p className="text-gray-500 mt-2">Please try again later</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-200">
            {/* Hero Section */}
            <Hero />

            {/* Category Navigation */}
            <CategoryNav
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Section Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {activeCategory === 'All' ? 'Latest Headlines' : activeCategory}
                    </h2>
                    <p className="text-gray-500 mt-1">
                        {filteredArticles?.length || 0} articles
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Show skeleton cards while loading
                        <>
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                            <ArticleSkeleton />
                        </>
                    ) : filteredArticles && filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">No articles found in this category</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
