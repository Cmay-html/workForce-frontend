import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const FreelancerLayout = () => {
  const navigation = [
    { name: 'Dashboard', href: '/freelancer/dashboard' },
    { name: 'Find Work', href: '/freelancer/projects' },
    { name: 'My Proposals', href: '/freelancer/proposals' },
    { name: 'Active Projects', href: '/freelancer/active-projects' },
    { name: 'Payments', href: '/freelancer/payments' },
    { name: 'Profile', href: '/freelancer/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">WorkForceFlow</h1>
              <span className="ml-3 text-sm text-gray-500">Freelancer Portal</span>
            </div>
            <nav className="flex space-x-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-primary-600'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default FreelancerLayout;