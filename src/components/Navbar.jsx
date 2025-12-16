import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import avatarUser from "../assets/img/avatar-user.jpg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      navigate("/auth/login");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="h-8 w-40 bg-white/20 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">UB</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline">
              UtilityBill Pro
            </span>
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
                  to="/dashboard/my-bills"
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
                >
                  <FaFileInvoiceDollar />
                  <span>My Pay Bills</span>
                </Link>

                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={user.photoURL || avatarUser}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = avatarUser;
                        }}
                      />
                    </div>
                    <span className="font-medium">
                      {user.displayName?.split(" ")[0] || "User"}
                    </span>
                  </div>

                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-4 border-b">
                      <p className="text-gray-800 font-medium truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-gray-600 text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center space-x-2 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 rounded-lg bg-transparent border-2 border-white hover:bg-white/10 font-medium transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-2 py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHome />
                <span>Home</span>
              </Link>

              <Link
                to="/bills"
                className="flex items-center space-x-2 py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaFileInvoiceDollar />
                <span>Bills</span>
              </Link>

              <Link
                to="/about"
                className="py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Link
                to="/faq"
                className="py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard/my-bills"
                    className="flex items-center space-x-2 py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaFileInvoiceDollar />
                    <span>My Pay Bills</span>
                  </Link>

                  <Link
                    to="/dashboard/profile"
                    className="flex items-center space-x-2 py-2 px-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>

                  <div className="py-3 px-2 border-t border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src={user.photoURL || avatarUser}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = avatarUser;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-white/80 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 py-3 px-2 text-left text-red-300 hover:bg-white/10 rounded-lg transition-colors mt-2 border-t border-white/20 pt-3"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                    <Link
                      to="/auth/login"
                      className="w-full text-center py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="w-full text-center py-3 border-2 border-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;