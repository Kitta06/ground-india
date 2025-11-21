import { Trophy, ExternalLink, Clock, Tv, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

// Fetch live scores from backend API
const fetchLiveScores = async () => {
    try {
        // Try to fetch real live scores first
        const { data } = await axios.get('/api/v1/sports/live-scores')
        if (data && data.length > 0) {
            return data
        }
        // Fallback to demo endpoint if no live matches
        const { data: demoData } = await axios.get('/api/v1/sports/live-scores/demo')
        return demoData
    } catch (error) {
        console.error('Error fetching live scores:', error)
        // Return demo data on error
        const { data } = await axios.get('/api/v1/sports/live-scores/demo')
        return data
    }
}

function ScoreCard({ match }) {
    return (
        <div className={`group relative bg-white dark:bg-[#1a1a1a] border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${match.isLive
                ? 'border-red-500 dark:border-red-500'
                : 'border-gray-200 dark:border-[#404040]'
            }`}>
            {/* Live Indicator */}
            {match.isLive && (
                <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    LIVE
                </div>
            )}

            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Trophy className="text-orange-500" size={18} />
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{match.sport}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{match.league}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${match.isLive
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                        {match.status}
                    </span>
                </div>

                {/* Teams and Scores */}
                <div className="space-y-3 mb-4">
                    {/* Team 1 */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f0f0f] rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {match.team1.short}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{match.team1.name}</p>
                                {match.team1.overs && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">({match.team1.overs} ov)</p>
                                )}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {match.team1.score}
                        </div>
                    </div>

                    {/* VS Divider */}
                    <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500">
                        VS
                    </div>

                    {/* Team 2 */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f0f0f] rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                                {match.team2.short}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{match.team2.name}</p>
                                {match.team2.overs && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">({match.team2.overs} ov)</p>
                                )}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {match.team2.score}
                        </div>
                    </div>
                </div>

                {/* Match Time/Venue */}
                {match.time && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <Clock size={14} />
                        <span>{match.time}</span>
                    </div>
                )}

                {/* Venue */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <Tv size={12} />
                    <span>{match.venue}</span>
                </div>

                {/* View Details Button */}
                <a
                    href={match.detailsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors group/btn"
                >
                    <span>View Full Details</span>
                    <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
}

export default function LiveScores() {
    const [autoRefresh, setAutoRefresh] = useState(true)

    // Fetch live scores with auto-refresh every 30 seconds
    const { data: liveScores, isLoading, error, refetch } = useQuery(
        'liveScores',
        fetchLiveScores,
        {
            refetchInterval: autoRefresh ? 30000 : false, // Refresh every 30 seconds
            refetchIntervalInBackground: true,
        }
    )

    const liveMatches = liveScores?.filter(match => match.isLive) || []
    const otherMatches = liveScores?.filter(match => !match.isLive) || []

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-2">Error loading live scores</p>
                    <p className="text-gray-500 dark:text-gray-400">Please try again later</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Trophy size={32} />
                                <h1 className="text-4xl font-bold">Live Sports Scores</h1>
                            </div>
                            <p className="text-red-100">
                                Real-time scores from major sporting events • Updates every 30 seconds
                            </p>
                        </div>

                        {/* Refresh Controls */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => refetch()}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm border border-white/30"
                                disabled={isLoading}
                            >
                                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                                <span className="font-medium">Refresh</span>
                            </button>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoRefresh}
                                    onChange={(e) => setAutoRefresh(e.target.checked)}
                                    className="w-4 h-4 rounded"
                                />
                                <span className="text-sm font-medium">Auto-refresh</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <RefreshCw size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Loading live scores...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Live Matches Section */}
                        {liveMatches.length > 0 ? (
                            <div className="mb-12">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Live Now ({liveMatches.length})
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {liveMatches.map(match => (
                                        <ScoreCard key={match.id} match={match} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="mb-12 p-12 bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
                                <Trophy size={48} className="text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    No Live Matches Right Now
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Check back soon for live sporting events
                                </p>
                            </div>
                        )}

                        {/* Other Matches Section */}
                        {otherMatches.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Recent & Upcoming
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {otherMatches.map(match => (
                                        <ScoreCard key={match.id} match={match} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Info Note */}
                        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Note:</strong> Scores update automatically every 30 seconds. Click "View Full Details" on any match card to get comprehensive coverage,
                                live commentary, statistics, and more on the official sports websites.
                            </p>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
