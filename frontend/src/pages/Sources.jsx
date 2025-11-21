import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSources = async () => {
    const { data } = await axios.get('/api/v1/sources/')
    return data
}

export default function Sources() {
    const { data: sources, isLoading, error } = useQuery('sources', fetchSources)

    if (isLoading) return <div className="text-center py-20">Loading sources...</div>
    if (error) return <div className="text-center py-20 text-red-500">Error loading sources</div>

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">News Sources</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">URL</th>
                            <th className="p-4 font-semibold text-gray-600">Reliability</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {sources.map(source => (
                            <tr key={source.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium">{source.name}</td>
                                <td className="p-4 text-blue-600">
                                    <a href={source.url} target="_blank" rel="noopener noreferrer">{source.url}</a>
                                </td>
                                <td className="p-4">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                                        {source.reliability_rating}/10
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
