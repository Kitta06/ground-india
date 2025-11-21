import { ExternalLink } from 'lucide-react'
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

        // Normalize score to percentages
        if (score < -20) {  // Left-leaning
            const left = 50 + Math.abs(score) / 2;
            const right = Math.max(0, 10 - Math.abs(score) / 10);
            const center = 100 - left - right;
            return { left, center, right };
        } else if (score > 20) {  // Right-leaning
            const right = 50 + score / 2;
            const left = Math.max(0, 10 - score / 10);
            const center = 100 - left - right;
            return { left, center, right };
        } else {  // Center
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

    return (
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#404040] rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-[#525252] transition-all duration-200 group">
            {/* Article Image */}
            {article.image_url && (
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-[#2d2d2d]">
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </div>
            )}

            {/* Article Content */}
            <div className="p-5">
                {/* Source and Bias */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {article.source?.name || 'Unknown Source'}
                    </span>

                    {/* Bias Percentage Bar */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                            <div className="w-20 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                                {/* Left portion (blue) */}
                                <div
                                    className="bg-blue-500"
                                    style={{ width: `${getBiasPercentages(article.bias_score).left}%` }}
                                    title={`Left: ${getBiasPercentages(article.bias_score).left.toFixed(1)}%`}
                                ></div>
                                {/* Center portion (purple) */}
                                <div
                                    className="bg-purple-500"
                                    style={{ width: `${getBiasPercentages(article.bias_score).center}%` }}
                                    title={`Center: ${getBiasPercentages(article.bias_score).center.toFixed(1)}%`}
                                ></div>
                                {/* Right portion (red) */}
                                <div
                                    className="bg-red-500"
                                    style={{ width: `${getBiasPercentages(article.bias_score).right}%` }}
                                    title={`Right: ${getBiasPercentages(article.bias_score).right.toFixed(1)}%`}
                                ></div>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">
                                {getBiasLabel(article.bias_score)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Time */}
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-2">
                    {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                    </a>
                </h3>

                {/* Summary */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {article.summary || 'No summary available.'}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-[#2d2d2d]">
                    {/* Category */}
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {article.category || 'General'}
                    </span>

                    {/* External link */}
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </div>
    )
}
