import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch, FaCalendar, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { baseApiUrl } from '../../utils/AppConstants';

const Bills = () => {
  useDocumentTitle('All Bills');

  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Electricity', 'Gas', 'Water', 'Internet'];

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    filterBills();
  }, [bills, selectedCategory, searchTerm]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseApiUrl}/api/bills`);
      const data = await response.json();
      setBills(data);
      setFilteredBills(data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBills = () => {
    let filtered = bills;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(bill => bill.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(bill =>
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBills(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">All Utility Bills</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and manage all your utility bills in one place. Filter by category or search for specific bills.
          </p>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-3">
              <FaFilter className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full md:w-auto">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {filteredBills.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bills found</h3>
            <p className="text-gray-500">Try changing your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBills.map((bill) => (
              <div key={bill._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.assets.so/img.jpg?w=600&h=300&bg=e5e7eb&text=${bill.title}&fontSize=26&f=png`;
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bill.category === 'Electricity' ? 'bg-yellow-100 text-yellow-800' :
                      bill.category === 'Gas' ? 'bg-red-100 text-red-800' :
                      bill.category === 'Water' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {bill.category}
                    </span>
                    <div className="text-2xl font-bold text-gray-800">
                      ৳{bill.amount.toLocaleString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {bill.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      <span className="truncate">{bill.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="mr-2 text-gray-400" />
                      <span>{formatDate(bill.date)}</span>
                    </div>
                  </div>
                  <Link
                    to={`/bills/${bill._id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <FaEye />
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-gray-600">
          Showing {filteredBills.length} of {bills.length} bills
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </div>
      </div>
    </div>
  );
};

export default Bills;