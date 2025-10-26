
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="top-bar">
      <div className="search-bar">
        <span style={{ 
          color: 'var(--text-light)',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Search
        </span>
        <input 
          type="text" 
          placeholder="Search projects, milestones..." 
        />
      </div>
      
      <div className="user-menu">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              {user?.firstName} {user?.lastName}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'var(--text-secondary)'
            }}>
              Client Account
            </div>
          </div>
          <div className="user-avatar">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <button
            onClick={logout}
            style={{
              background: 'var(--secondary-white)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--border-light)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'var(--secondary-white)';
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