
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter current page
      // You could implement search functionality here
    }
  };

  const getRoleDisplay = () => {
    return role === 'client' ? 'Client Account' : 'Freelancer Account';
  };

  return (
    <div className="top-bar">
      <div className="search-bar">
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px', color: '#6b7280' }}>
            <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search projects, milestones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '14px',
              color: '#374151'
            }}
          />
        </form>
      </div>

      <div className="user-menu">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Quick Navigation Links */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.color = '#374151';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate(role === 'client' ? '/client/projects' : '/freelancer/projects')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f3f4f6';
                e.target.style.color = '#374151';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              Projects
            </button>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {user?.firstName} {user?.lastName}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              {getRoleDisplay()}
            </div>
          </div>
          <div className="user-avatar">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out?')) {
                logout();
                navigate('/');
              }
            }}
            style={{
              background: '#ffffff',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.borderColor = '#e5e7eb';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;