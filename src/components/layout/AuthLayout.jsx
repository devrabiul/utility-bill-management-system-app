import { Outlet, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center py-12 px-4">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">UB</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              UtilityBill Pro
            </span>
          </Link>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          <Outlet />
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Need help?{" "}
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-800"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;