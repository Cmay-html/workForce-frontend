import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ClientLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('proposals');
    navigate('/login');
  };

  const isActivePage = (path) => {
    if (path === '/client/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ minWidth: '1024px' }}>
      {/* Sidebar - Fixed and Improved */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 shadow-lg">
        <div className="p-6 border-b border-gray-200">
          {/* Improved Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">WorkforceFlow</span>
              <div className="text-xs text-gray-500 font-medium">Client Portal</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              Client Account
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => navigate('/client/dashboard')}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage('/client/dashboard') 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActivePage('/client/dashboard') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className={`w-4 h-4 ${isActivePage('/client/dashboard') ? 'text-blue-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-gray-500 mt-0.5">Project overview</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/projects')}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage('/client/projects') 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActivePage('/client/projects') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className={`w-4 h-4 ${isActivePage('/client/projects') ? 'text-blue-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Projects</div>
                  <div className="text-xs text-gray-500 mt-0.5">Manage projects</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/chat')}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage('/chat') 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActivePage('/chat') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className={`w-4 h-4 ${isActivePage('/chat') ? 'text-blue-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Messages</div>
                  <div className="text-xs text-gray-500 mt-0.5">Chat with team</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/milestones')}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage('/client/milestones') 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActivePage('/client/milestones') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className={`w-4 h-4 ${isActivePage('/client/milestones') ? 'text-blue-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Milestones</div>
                  <div className="text-xs text-gray-500 mt-0.5">Review work</div>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/client/profile')}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 hover:shadow-sm ${
                  isActivePage('/client/profile') 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActivePage('/client/profile') ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <svg className={`w-4 h-4 ${isActivePage('/client/profile') ? 'text-blue-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-gray-500 mt-0.5">Account settings</div>
                </div>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-100">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">Logout</div>
                <div className="text-xs text-gray-500 mt-0.5">Sign out</div>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-5">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {location.pathname === '/client/dashboard' && 'Dashboard'}
                  {location.pathname.startsWith('/client/projects') && 'Projects'}
                  {location.pathname.startsWith('/client/profile') && 'Profile'}
                  {location.pathname.startsWith('/client/milestones') && 'Milestones'}
                  {location.pathname.startsWith('/chat') && 'Messages'}
                </h1>
                <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Client Portal</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Client
                  </div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
