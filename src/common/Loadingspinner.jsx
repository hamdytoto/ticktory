export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
}
