import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3">
        <div className="container mx-auto">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">UB</span>
            </div>
            <span className="text-xl font-bold">UtilityBill Pro</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
            >
              <FaHome />
              <span>Home</span>
            </Link>

            <Link
              to="/bills"
              className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
            >
              <FaFileInvoiceDollar />
              <span>Bills</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-bills"
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
                >
                  <FaFileInvoiceDollar />
                  <span>My Pay Bills</span>
                </Link>

                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                        }
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">
                      {user.displayName?.split(" ")[0]}
                    </span>
                  </div>

                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-4 border-b dark:border-gray-700">
                      <p className="text-gray-800 dark:text-white font-medium">
                        {user.displayName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-transparent border-2 border-white hover:bg-white/10 font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-2xl">☰</button>
        </div>

        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block py-2 hover:bg-white/10 rounded px-2">
            Home
          </Link>
          <Link
            to="/bills"
            className="block py-2 hover:bg-white/10 rounded px-2"
          >
            Bills
          </Link>
          {user ? (
            <>
              <Link
                to="/my-bills"
                className="block py-2 hover:bg-white/10 rounded px-2"
              >
                My Pay Bills
              </Link>
              <div className="flex items-center space-x-3 py-2 px-2">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                  }
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full"
                />
                <span className="flex-grow">{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-300 hover:text-white"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="flex-1 text-center py-2 bg-white text-blue-600 rounded font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center py-2 border border-white rounded font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
