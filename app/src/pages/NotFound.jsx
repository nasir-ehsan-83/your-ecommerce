// pages/NotFound.jsx
import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertCircle className="w-16 h-16 text-red-500" />
          </div>
        </div>
        <h1 className="text-6xl font-extrabold text-slate-800 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-600 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;