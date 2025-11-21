import { ExternalLink, Clock, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function ArticleCard({ article }) {
    const getBiasLabel = (score) => {
        if (score === undefined || score === null) return 'Center';
        if (score < -30) return 'Left';
        if (score < -10) return 'Center-Left';
        if (score <= 10) return 'Center';
        if (score <= 30) return 'Center-Right';
        return 'Right';
    };

    const getBiasPercentages = (score) => {
        if (score === undefined || score === null) {
            return { left: 10, center: 80, right: 10 };
        }

        if (score < -20) {
            const left = 50 + Math.abs(score) / 2;
            const right = Math.max(0, 10 - Math.abs(score) / 10);
            const center = 100 - left - right;
            return { left, center, right };
        } else if (score > 20) {
            const right = 50 + score / 2;
            const left = Math.max(0, 10 - score / 10);
            const center = 100 - left - right;
            return { left, center, right };
        } else {
            const center = 60 + (20 - Math.abs(score));
            if (score < 0) {
                const left = 30 + Math.abs(score);
                const right = 100 - center - left;
                return { left, center, right };
            } else {
                const right = 30 + score;
                const left = 100 - center - right;
                return { left, center, right };
            }
        }
    };

    const biasPercentages = getBiasPercentages(article.bias_score);
    const biasLabel = getBiasLabel(article.bias_score);

    return (
        <article className="group relative bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#404040] rounded-xl overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Article Image */}
            {article.image_url && (
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#2d2d2d] dark:to-[#1a1a1a]">
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category badge on image */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-lg">
                            {article.category || 'General'}
                        </span>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <div className="p-5">
                {/* Source and Time Row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {article.source?.name?.charAt(0) || 'N'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {article.source?.name || 'Unknown'}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <Clock size={12} />
                                <span>{formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bias Visualization - Enhanced */}
                <div className="mb-4 p-3 bg-gray-50 dark:bg-[#0f0f0f] rounded-lg border border-gray-200 dark:border-[#2d2d2d]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Political Bias</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{biasLabel}</span>
                    </div>

                    {/* Bias bar with labels */}
                    <div className="relative">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex shadow-inner">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:opacity-80"
                                style={{ width: `${biasPercentages.left}%` }}
                                title={`Left: ${biasPercentages.left.toFixed(1)}%`}
                            ></div>
                            <div
                                className="bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-300 hover:opacity-80"
                                style={{ width: `${biasPercentages.center}%` }}
                                title={`Center: ${biasPercentages.center.toFixed(1)}%`}
                            ></div>
                            <div
                                className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 hover:opacity-80"
                                style={{ width: `${biasPercentages.right}%` }}
                                title={`Right: ${biasPercentages.right.toFixed(1)}%`}
                            ></div>
                        </div>

                        {/* Percentage labels */}
                        <div className="flex justify-between mt-1 text-[10px] font-medium">
                            <span className="text-blue-600 dark:text-blue-400">{biasPercentages.left.toFixed(0)}%</span>
                            <span className="text-purple-600 dark:text-purple-400">{biasPercentages.center.toFixed(0)}%</span>
                            <span className="text-red-600 dark:text-red-400">{biasPercentages.right.toFixed(0)}%</span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {article.title}
                    </a>
                </h3>

                {/* Summary */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {article.summary || 'No summary available.'}
                </p>

                {/* Footer with Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-[#2d2d2d]">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                    >
                        <span>Read Full Story</span>
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    {/* Trending indicator (if applicable) */}
                    {article.category === 'Politics' && (
                        <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                            <TrendingUp size={14} />
                            <span className="font-medium">Trending</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </article>
    )
}
