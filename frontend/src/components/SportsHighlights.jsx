import { Trophy, Calendar, MapPin } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function SportsHighlights({ articles }) {
    // Get the most recent sports articles (last 24 hours if possible)
    const recentArticles = articles
        .filter(article => article.category === 'Sports')
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 3);

    if (recentArticles.length === 0) return null;

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Recent Sports Highlights
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentArticles.map((article, index) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-gradient-to-br from-orange-500 to-red-600 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Background Image */}
                        {article.image_url && (
                            <div className="absolute inset-0">
                                <img
                                    src={article.image_url}
                                    alt={article.title}
                                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        {/* Content */}
                        <div className="relative p-6 h-64 flex flex-col justify-between">
                            {/* Badge */}
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                    <Trophy size={12} />
                                    {index === 0 ? 'BREAKING' : 'LATEST'}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-white/80">
                                    <Calendar size={12} />
                                    <span>{formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-3 group-hover:text-orange-200 transition-colors">
                                    {article.title}
                                </h3>

                                {/* Source */}
                                <div className="flex items-center gap-2 text-sm text-white/90">
                                    <MapPin size={14} />
                                    <span className="font-medium">{article.source?.name || 'Sports News'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Border Effect */}
                        <div className="absolute inset-0 border-2 border-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </a>
                ))}
            </div>

            {/* Divider */}
            <div className="mt-8 border-t-2 border-gray-200 dark:border-[#404040]"></div>
        </div>
    );
}
