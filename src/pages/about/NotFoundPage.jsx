import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Icon */}
      <div className="mb-6">
        <svg
          className="w-24 h-24 text-blue-400 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 5h13.856c1.044 0 1.928-.816 1.992-1.859l.873-10.486c.085-1.02-.747-1.897-1.77-1.897H5.843c-1.023 0-1.855.877-1.77 1.897l.873 10.486c.064 1.043.948 1.859 1.992 1.859z"></path>
        </svg>
      </div>

      <h1 className="text-5xl font-extrabold text-blue-500">404</h1>
      <p className="text-xl text-gray-700 mt-2">Oops! Page Not Found</p>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
