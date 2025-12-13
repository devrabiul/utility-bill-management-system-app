import React from 'react';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Utility Bill Management System
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {['Electricity', 'Gas', 'Water', 'Internet'].map((category) => (
          <div key={category} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <p className="text-gray-600">Manage your {category.toLowerCase()} bills</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Home;