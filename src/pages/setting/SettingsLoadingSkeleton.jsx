const SettingsLoadingSkeleton = () => {
    return (
        <div className="mx-auto p-6">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-8 w-1/4"></div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                    <div className="space-y-4">
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLoadingSkeleton;