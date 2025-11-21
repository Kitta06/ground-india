import { ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function ArticleCard({ article }) {
    // Calculate bias position (for visual indicator)
    const getBiasColor = (rating) => {
        if (!rating) return 'bg-purple-500';
        if (rating < -3) return 'bg-blue-500'; // Left
        if (rating > 3) return 'bg-red-500'; // Right
        return 'bg-purple-500'; // Center
    };

    const getBiasLabel = (rating) => {
        if (!rating) return 'Center';
        if (rating < -3) return 'Left';
        if (rating > 3) return 'Right';
        return 'Center';
    };

    return (
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#404040] rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-[#525252] transition-all duration-200 group">
            {/* Article Image */}
            {article.image_url && (
                <div className="relative h-48 overflow-hidden bg-[#2d2d2d]">
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </div>
            )}

            <div className="p-5">
                {/* Header with source count and time */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        {/* Source badge */}
                        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            {article.source?.name || 'Unknown Source'}
                        </span>

                        {/* Bias indicator */}
                        <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getBiasColor(article.source?.bias_rating)}`}></div>
                            <span className="text-xs text-gray-500">{getBiasLabel(article.source?.bias_rating)}</span>
                        </div>
                    </div>

                    <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                    </a>
                </h3>

                {/* Summary */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {article.summary || 'No summary available.'}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#2d2d2d]">
                    {/* Category */}
                    <span className="text-xs text-gray-500 font-medium">
                        {article.category || 'General'}
                    </span>

                    {/* External link */}
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </div>
    )
}
