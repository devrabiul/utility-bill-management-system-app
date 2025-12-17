import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaFire,
  FaTint,
  FaWifi,
  FaCalendar,
  FaMapMarkerAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { baseApiUrl } from "../utils/AppConstants";

const Home = () => {

  useDocumentTitle('Home');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [recentBills, setRecentBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200",
      title: "Manage All Your Utility Bills in One Place",
      description:
        "Track, pay, and manage electricity, gas, water, and internet bills seamlessly",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200",
      title: "Never Miss a Payment Deadline",
      description: "Get reminders and notifications for upcoming bill payments",
    },
    {
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200",
      title: "Download Detailed Payment Reports",
      description: "Generate PDF reports of your payment history anytime",
    },
  ];

  const categories = [
    {
      icon: FaBolt,
      title: "Electricity",
      color: "from-yellow-400 to-yellow-600",
    },
    { icon: FaFire, title: "Gas", color: "from-red-400 to-red-600" },
    { icon: FaTint, title: "Water", color: "from-blue-400 to-blue-600" },
    { icon: FaWifi, title: "Internet", color: "from-purple-400 to-purple-600" },
  ];

  useEffect(() => {
    fetchRecentBills();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const fetchRecentBills = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseApiUrl}/api/bills`);
      const data = await response.json();
      setRecentBills(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
      toast.error("Failed to load recent bills. Showing sample data.");
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
      })
      .format(amount)
      .replace("BDT", "৳");
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            </div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 text-white">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-8 text-gray-200">
                    {slide.description}
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      to="/bills"
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      View All Bills
                    </Link>
                    <Link
                      to="/register"
                      className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                    >
                      Get Started Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <FaChevronRight />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Bill Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ icon: Icon, title, color }) => (
            <div
              key={title}
              className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-4xl" />
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {recentBills.filter((bill) => bill.category === title).length}{" "}
                  Bills
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{title} Bills</h3>
              <p className="text-white/80">
                Manage and pay your {title.toLowerCase()} bills
              </p>
              <Link
                to={`/bills?category=${title}`}
                className="mt-4 inline-flex items-center text-sm font-medium hover:underline"
              >
                View Bills <FaArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Bills</h2>
            <Link
              to="/bills"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View All Bills
              <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-6 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentBills.map((bill) => (
                <div
                  key={bill._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          bill.category === "Electricity"
                            ? "bg-yellow-100 text-yellow-800"
                            : bill.category === "Gas"
                            ? "bg-red-100 text-red-800"
                            : bill.category === "Water"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {bill.category}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatAmount(bill.amount)}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                    {bill.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                      <span className="truncate">{bill.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="mr-2 flex-shrink-0" />
                      <span>{formatDate(bill.date)}</span>
                    </div>
                  </div>
                  <Link
                    to={`/bills/${bill._id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
                  >
                    See Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose UtilityBill Pro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Safe</h3>
            <p className="text-gray-600">
              Your data is protected with bank-level security and encryption
              protocols.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
            <p className="text-gray-600">
              Track all your bill payments in real-time with instant updates and
              notifications.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
            <p className="text-gray-600">
              Generate comprehensive PDF reports for your financial records and
              tax purposes.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
              <p className="text-blue-100">
                Create your free account in less than 2 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Add Bills</h3>
              <p className="text-blue-100">
                Add your utility bills from different service providers
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Track & Pay</h3>
              <p className="text-blue-100">
                Monitor due dates and make payments securely
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate Reports</h3>
              <p className="text-blue-100">
                Download PDF reports for your payment history
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;