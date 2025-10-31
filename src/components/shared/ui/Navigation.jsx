import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ items, className = '' }) => {
  const location = useLocation();

  return (
    <nav className={`flex space-x-1 ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-3xl font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-primary text-white shadow-glass animate-glow'
                : 'text-primary-300 hover:text-white hover:bg-primary-900/30 hover:transform hover:scale-105'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
