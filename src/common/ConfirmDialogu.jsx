/* eslint-disable react/prop-types */
const ConfirmDialog = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8 backdrop-blur-sm bg-black/10">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 relative">

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    onClick={onCancel}
                    aria-label="Close dialog"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Dialog Content */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 text-center">
                    Are you sure?
                </h2>

                <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 text-center">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
