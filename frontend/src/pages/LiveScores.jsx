import { Trophy, ExternalLink, Clock, Tv } from 'lucide-react'

// Mock live scores data - In production, this would come from a sports API
const liveScores = [
    {
        id: 1,
        sport: 'Cricket',
        league: 'IPL 2024',
        status: 'LIVE',
        team1: {
            name: 'Mumbai Indians',
            short: 'MI',
            score: '185/4',
            overs: '18.3'
        },
        team2: {
            name: 'Chennai Super Kings',
            short: 'CSK',
            score: '142/6',
            overs: '15.0'
        },
        venue: 'Wankhede Stadium, Mumbai',
        detailsUrl: 'https://www.espncricinfo.com',
        isLive: true
    },
    {
        id: 2,
        sport: 'Football',
        league: 'Premier League',
        status: 'LIVE',
        team1: {
            name: 'Manchester United',
            short: 'MUN',
            score: '2'
        },
        team2: {
            name: 'Liverpool',
            short: 'LIV',
            score: '1'
        },
        time: "67'",
        venue: 'Old Trafford',
        detailsUrl: 'https://www.premierleague.com',
        isLive: true
    },
    {
        id: 3,
        sport: 'Cricket',
        league: 'Test Match',
        status: 'Day 2',
        team1: {
            name: 'India',
            short: 'IND',
            score: '345 & 89/2',
            overs: '25.0'
        },
        team2: {
            name: 'Australia',
            short: 'AUS',
            score: '287'
        },
        venue: 'MCG, Melbourne',
        detailsUrl: 'https://www.espncricinfo.com',
        isLive: false
    },
    {
        id: 4,
        sport: 'Football',
        league: 'La Liga',
        status: 'HT',
        team1: {
            name: 'Real Madrid',
            short: 'RMA',
            score: '1'
        },
        team2: {
            name: 'Barcelona',
            short: 'BAR',
            score: '0'
        },
        venue: 'Santiago Bernabéu',
        detailsUrl: 'https://www.laliga.com',
        isLive: false
    },
    {
        id: 5,
        sport: 'Tennis',
        league: 'Australian Open',
        status: 'LIVE',
        team1: {
            name: 'Novak Djokovic',
            short: 'DJO',
            score: '6-4, 3-2'
        },
        team2: {
            name: 'Carlos Alcaraz',
            short: 'ALC',
            score: '4-6, 2-3'
        },
        venue: 'Rod Laver Arena',
        detailsUrl: 'https://ausopen.com',
        isLive: true
    },
    {
        id: 6,
        sport: 'Basketball',
        league: 'NBA',
        status: 'Q3',
        team1: {
            name: 'LA Lakers',
            short: 'LAL',
            score: '78'
        },
        team2: {
            name: 'Golden State Warriors',
            short: 'GSW',
            score: '82'
        },
        time: '5:23',
        venue: 'Crypto.com Arena',
        detailsUrl: 'https://www.nba.com',
        isLive: true
    }
];

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
    const liveMatches = liveScores.filter(match => match.isLive);
    const otherMatches = liveScores.filter(match => !match.isLive);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-3">
                        <Trophy size={32} />
                        <h1 className="text-4xl font-bold">Live Sports Scores</h1>
                    </div>
                    <p className="text-red-100">
                        Real-time scores from major sporting events around the world
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Live Matches Section */}
                {liveMatches.length > 0 && (
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
                        <strong>Note:</strong> Click "View Full Details" on any match card to get comprehensive coverage,
                        live commentary, statistics, and more on the official sports websites.
                    </p>
                </div>
            </main>
        </div>
    );
}
