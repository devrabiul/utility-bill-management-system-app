// src/pages/dashboard/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaSave, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Profile = () => {
  useDocumentTitle('Profile');
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.displayName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+880 1234 567890',
    address: '123/A, Business Street, Dhaka 1212, Bangladesh',
    photoURL: user?.photoURL || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={profileData.photoURL || `https://ui-avatars.com/api/?name=${profileData.name}&background=6366f1&color=fff&size=128`}
                        alt={profileData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{profileData.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">Member Since</p>
                    <p className="font-medium text-gray-800">January 15, 2024</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600">Account Type</p>
                    <p className="font-medium text-gray-800">Premium User</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="text-gray-500" />
                      Full Name
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.name}
                      </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="text-gray-500" />
                      Email Address
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.email}
                      </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="text-gray-500" />
                      Phone Number
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.phone}
                      </div>
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      Address
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.address}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;