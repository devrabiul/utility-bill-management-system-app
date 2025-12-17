import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaCalendar, FaMapMarkerAlt, FaDollarSign, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { baseApiUrl } from '../../utils/AppConstants';

const BillDetails = () => {
  useDocumentTitle('Bill Details');

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    username: '',
    address: '',
    phone: '',
    additionalInfo: ''
  });  

  useEffect(() => {
    fetchBillDetails();
  }, [id]);

  const fetchBillDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseApiUrl}/api/bills/${id}`);
      const data = await response.json();      
      setBill(data);
    } catch (error) {
      toast.error('Failed to load bill details');
      navigate('/bills');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentMonth = (dateString) => {
    const billDate = new Date(dateString);
    const now = new Date();
    return billDate.getMonth() === now.getMonth() && billDate.getFullYear() === now.getFullYear();
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const paymentPayload = {
        billId: id,
        billTitle: bill.title,
        email: user.email,
        amount: bill.amount,
        date: new Date().toISOString(),
        ...paymentData,
        userId: user.uid
      };

      const response = await fetch(`${baseApiUrl}/api/bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentPayload)
      });

      if (response.ok) {
        toast.success('Bill payment successful!');
        setShowPaymentModal(false);
        navigate('/dashboard/bills');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bill not found</h2>
          <button
            onClick={() => navigate('/bills')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  const canPay = isCurrentMonth(bill.date);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate('/bills')}
              className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
            >
              ← Back to Bills
            </button>
            <h1 className="text-3xl font-bold text-gray-800">{bill.title}</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="h-64 md:h-80 overflow-hidden">
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.assets.so/img.jpg?w=600&h=300&bg=e5e7eb&text=${bill.title}&fontSize=26&f=png`;
                }}
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        bill.category === 'Electricity' ? 'bg-yellow-100 text-yellow-800' :
                        bill.category === 'Gas' ? 'bg-red-100 text-red-800' :
                        bill.category === 'Water' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {bill.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{bill.location}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaCalendar className="text-gray-400" />
                      <span>{new Date(bill.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Amount</label>
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                      <FaDollarSign className="text-green-600" />
                      <span>৳{bill.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Payment Status</label>
                    <div className="flex items-center gap-2">
                      {canPay ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <FaCheckCircle />
                          <span>Payable this month</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <FaTimesCircle />
                          <span>Not payable this month</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                <p className="text-gray-700 leading-relaxed">{bill.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bill Payment</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Current Month Status</h3>
                  <p className="text-gray-600">
                    {canPay 
                      ? "This bill is payable for the current month"
                      : "This bill is not payable for the current month"}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-lg font-medium ${
                  canPay ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {canPay ? 'Payable' : 'Not Payable'}
                </div>
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={!canPay || !user}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  canPay && user
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!user ? 'Please login to pay bill' : 'Pay Bill'}
              </button>

              {!canPay && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> You can only pay bills for the current month. 
                    This bill is from a previous month.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Pay Bill</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
                  <input
                    type="text"
                    value={id}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="text"
                    value={`৳${bill.amount.toLocaleString()}`}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={paymentData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={paymentData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={paymentData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                  <input
                    type="text"
                    value={new Date().toLocaleDateString()}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info (Optional)</label>
                  <textarea
                    name="additionalInfo"
                    value={paymentData.additionalInfo}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional information"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  Confirm Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;