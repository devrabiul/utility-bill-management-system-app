import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FaEdit, FaTrash, FaDownload, FaFilePdf, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendar, FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { baseApiUrl } from '../../utils/AppConstants';

const MyPayBills = () => {
  useDocumentTitle('My Paid Bills');

  const { user } = useAuth();
  const [myBills, setMyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [updateData, setUpdateData] = useState({
    amount: '',
    address: '',
    phone: '',
    date: ''
  });

  useEffect(() => {
    if (user) {
      fetchMyBills();
    }
  }, [user]);

  const fetchMyBills = async () => {
    try {
      setLoading(true);
      // Changed from /api/bills to /api/my-bills
      const response = await fetch(`${baseApiUrl}/api/my-bills?userId=${user.uid}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMyBills(data);
    } catch (error) {
      console.error('Failed to load your bills:', error);
      toast.error('Failed to load your bills. Please try again.');
      setMyBills([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (bill) => {
    setSelectedBill(bill);
    setUpdateData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date ? bill.date.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setShowUpdateModal(true);
  };

  const handleDelete = (bill) => {
    setSelectedBill(bill);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedBill) return;
    
    try {
      // Changed from /api/bills to /api/my-bills
      const response = await fetch(`${baseApiUrl}/api/my-bills/${selectedBill._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Bill deleted successfully');
        setMyBills(myBills.filter(bill => bill._id !== selectedBill._id));
        setShowDeleteModal(false);
        setSelectedBill(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(`Failed to delete bill: ${error.message}`);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBill) return;
    
    try {
      // Changed from /api/bills to /api/my-bills
      const response = await fetch(`${baseApiUrl}/api/my-bills/${selectedBill._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        toast.success('Bill updated successfully');
        fetchMyBills(); // Refresh the list
        setShowUpdateModal(false);
        setSelectedBill(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(`Failed to update bill: ${error.message}`);
    }
  };

  const generatePDF = () => {
    if (myBills.length === 0) {
      toast.warning('No bills to generate report');
      return;
    }

    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('Bill Payment Report', 14, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
      doc.text(`User: ${user?.displayName || user?.email}`, 14, 38);
      
      const tableColumn = ['Username', 'Email', 'Amount', 'Address', 'Phone', 'Date'];
      const tableRows = myBills.map(bill => [
        bill.username || 'N/A',
        bill.email || 'N/A',
        `৳${bill.amount || 0}`,
        bill.address || 'N/A',
        bill.phone || 'N/A',
        bill.date ? new Date(bill.date).toLocaleDateString() : 'N/A'
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      const totalAmount = myBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
      const finalY = doc.lastAutoTable.finalY || 45;
      
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Total Bills Paid: ${myBills.length}`, 14, finalY + 15);
      doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 14, finalY + 25);
      
      const fileName = `bill-report-${user?.uid || 'user'}-${new Date().getTime()}.pdf`;
      doc.save(fileName);
      
      toast.success('PDF report downloaded successfully');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF report');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return `৳${amount ? amount.toLocaleString() : '0'}`;
  };

  const totalAmount = myBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Paid Bills</h1>
          <p className="text-gray-600">View and manage all the bills you have paid</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Bills Paid</p>
                <h3 className="text-3xl font-bold mt-2">{myBills.length}</h3>
              </div>
              <FaFilePdf className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Amount Paid</p>
                <h3 className="text-3xl font-bold mt-2">{formatCurrency(totalAmount)}</h3>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-80" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={generatePDF}
            disabled={myBills.length === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              myBills.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            <FaDownload />
            Download Report (PDF)
          </button>
        </div>

        {myBills.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">💸</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No paid bills yet</h3>
            <p className="text-gray-500 mb-6">Pay your first bill to see it here</p>
            <a
              href="/bills"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
            >
              View Bills to Pay
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaUser />
                        Username
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaEnvelope />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave />
                        Amount
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        Address
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaPhone />
                        Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaCalendar />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {myBills.map((bill) => (
                    <tr key={bill._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{bill.username || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{bill.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-green-600">
                          {formatCurrency(bill.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs truncate">{bill.address || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{bill.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{formatDate(bill.date)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(bill)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(bill)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showUpdateModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Update Bill Payment</h3>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (৳)</label>
                  <input
                    type="number"
                    value={updateData.amount}
                    onChange={(e) => setUpdateData({...updateData, amount: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={updateData.address}
                    onChange={(e) => setUpdateData({...updateData, address: e.target.value})}
                    required
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={updateData.phone}
                    onChange={(e) => setUpdateData({...updateData, phone: e.target.value})}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={updateData.date}
                    onChange={(e) => setUpdateData({...updateData, date: e.target.value})}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
                  >
                    Update Bill
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Bill</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this bill payment record? This action cannot be undone.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-medium text-gray-800">{selectedBill.billTitle || 'Untitled Bill'}</p>
                <p className="text-gray-600">Amount: {formatCurrency(selectedBill.amount)}</p>
                <p className="text-gray-600">Date: {formatDate(selectedBill.date)}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPayBills;