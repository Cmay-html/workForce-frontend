// src/components/Dashboard/Navbar.jsx
import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import Button from '../UI/Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              KaziFlow Management
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, <strong>{user?.firstName} {user?.lastName}</strong>
            </span>
            <Button 
              variant="outline" 
              size="small"
              onClick={logout}
            >
              Sighn out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;