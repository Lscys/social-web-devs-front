export default function PostSkeleton() {
    return (
        <div className="bg-white rounded-xl p-6 shadow space-y-4 animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex-1 h-4 bg-gray-300 rounded" />
            </div>
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-64 bg-gray-300 rounded" />
        </div>
    );
}