/* eslint-disable react/prop-types */
const ConfirmDialog = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    onClick={onCancel}
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
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Are you sure?</h2>
                <p className="text-sm text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
