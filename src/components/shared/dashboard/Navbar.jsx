
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Emit search event or update global search state
    window.dispatchEvent(new CustomEvent('dashboardSearch', { detail: searchQuery }));
  };

  const getRoleDisplay = () => {
    return role === 'client' ? 'Client Account' : 'Freelancer Account';
  };

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              WorkFlow Management
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="search-bar" style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f9fafb',
                borderRadius: '8px',
                padding: '8px 16px',
                width: '300px',
                border: '1px solid #e5e7eb'
              }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <input
                    type="text"
                    placeholder="Search projects, milestones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      flex: 1,
                      fontSize: '14px',
                      color: '#374151'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      marginLeft: '8px',
                      borderRadius: '4px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#e5e7eb';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#6b7280' }}>
                      <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('dashboardSearch', { detail: 'all' }))}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
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
                  All
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('dashboardSearch', { detail: 'projects' }))}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
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
                  Search Projects
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('dashboardSearch', { detail: 'milestones' }))}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
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
                  Milestones
                </button>
              </div>
            </div>
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
            <div className="user-avatar" style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0066ff, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  logout();
                  navigate('/login');
                }
              }}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#b91c1c';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#dc2626';
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
