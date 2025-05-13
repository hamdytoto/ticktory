import LoginHeader from "../../layouts/Navbar/LoginHeader";

const CheckEmail = () => {
    return (
        <>
            <LoginHeader />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
                <div className="w-full max-w-md text-center">
                    {/* Email Icon */}
                    <div className="flex justify-center mb-4">
                        <i className="fas fa-envelope text-6xl text-blue-600"></i>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-extrabold text-black mb-2">Check Your Email</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        We have sent an email with a link to reset your password.
                    </p>

                    {/* Button */}
                    <button
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition text-lg"
                    >
                        Open Email
                    </button>
                </div>
            </div>
        </>
    );
}

export default CheckEmail;
