// src/pages/About.jsx
import React from 'react';
import { FaUsers, FaBullseye, FaHandshake, FaAward } from 'react-icons/fa';
import useDocumentTitle from '../hooks/useDocumentTitle';

const About = () => {
  useDocumentTitle('About Us');
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About UtilityBill Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing utility bill management with innovative solutions that save you time, money, and stress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBullseye className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To simplify utility bill management for everyone by providing a secure, intuitive platform 
              that empowers users to take control of their expenses with ease and confidence.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaAward className="text-purple-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To become the leading utility bill management platform in Bangladesh and beyond, 
              recognized for our innovation, reliability, and commitment to customer satisfaction.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Founded in 2023, UtilityBill Pro was born out of a simple observation: managing utility bills 
              was unnecessarily complicated and time-consuming for millions of households and businesses.
            </p>
            <p className="mb-4">
              Our team of developers, financial experts, and user experience designers came together 
              with a shared goal: to create a solution that would transform this tedious chore into 
              a seamless, efficient process.
            </p>
            <p>
              Today, we serve thousands of satisfied customers across Bangladesh, helping them 
              manage their electricity, gas, water, and internet bills with unprecedented ease and 
              providing valuable insights into their consumption patterns.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaUsers,
                title: "Customer First",
                description: "We prioritize our users' needs and work tirelessly to exceed their expectations."
              },
              {
                icon: FaHandshake,
                title: "Integrity",
                description: "We operate with transparency, honesty, and ethical business practices."
              },
              {
                icon: FaBullseye,
                title: "Innovation",
                description: "We continuously improve our platform with cutting-edge technology."
              },
              {
                icon: FaAward,
                title: "Excellence",
                description: "We strive for perfection in every feature and service we provide."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Join Our Growing Community</h2>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
            Thousands of satisfied users trust UtilityBill Pro to manage their utility bills efficiently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-blue-100">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">৳50M+</div>
              <p className="text-blue-100">Bills Processed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.5%</div>
              <p className="text-blue-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;