import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/admin" className="mr-4">Admin</Link>
          <Link to="/admin/analytics">Analytics</Link>
        </div>
        {user && (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;