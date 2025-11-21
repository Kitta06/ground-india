export default function ArticleSkeleton() {
    return (
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl overflow-hidden">
            <div className="h-48 bg-[#2d2d2d] animate-pulse"></div>
            <div className="p-5 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                    <div className="h-5 w-24 bg-[#2d2d2d] rounded-full"></div>
                    <div className="h-4 w-16 bg-[#2d2d2d] rounded"></div>
                </div>
                <div className="h-6 bg-[#2d2d2d] rounded mb-2"></div>
                <div className="h-6 bg-[#2d2d2d] rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-[#2d2d2d] rounded"></div>
                    <div className="h-4 bg-[#2d2d2d] rounded"></div>
                    <div className="h-4 bg-[#2d2d2d] rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
}
