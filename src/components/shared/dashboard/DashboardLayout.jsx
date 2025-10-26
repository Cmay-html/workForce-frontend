// src/components/shared/dashboard/DashboardLayout.jsx
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const clientName = user?.firstName + " " + user?.lastName || "User";

  const navItems = [
    {
      path: "/client/dashboard",
      label: "Dashboard",
      description: "Project overview",
    },
    {
      path: "/client/projects",
      label: "Projects",
      description: "Manage projects",
    },
    {
      path: "/client/milestones",
      label: "Milestones",
      description: "Review work",
    },
    {
      path: "/client/reviews",
      label: "Reviews",
      description: "Rate freelancers",
    },
    {
      path: "/client/profile",
      label: "Profile",
      description: "Account settings",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">K</div>
            Kaziflow
          </div>
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: "var(--secondary-white)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-light)",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              {clientName}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            >
              Client Account
            </p>
          </div>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <span className="nav-icon" style={{ fontWeight: "600" }}>
                  {item.label.charAt(0)}
                </span>
                <div>
                  <div style={{ fontWeight: "500" }}>{item.label}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-light)",
                      marginTop: "2px",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </Link>
            </li>
          ))}

          {/* Logout Button */}
          <li className="nav-item" style={{ marginTop: "auto" }}>
            <button
              onClick={handleLogout}
              className="nav-link"
              style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <span className="nav-icon" style={{ fontWeight: "600" }}>
                L
              </span>
              <div>
                <div style={{ fontWeight: "500" }}>Logout</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-light)",
                    marginTop: "2px",
                  }}
                >
                  Sign out of account
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        {/* Top Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <span style={{ color: "var(--text-light)" }}>Search</span>
            <input
              type="text"
              placeholder="Search projects, milestones..."
              style={{
                border: "none",
                background: "none",
                outline: "none",
                marginLeft: "8px",
                width: "100%",
                fontSize: "14px",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div className="user-menu">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                  }}
                >
                  {clientName}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  Client
                </div>
              </div>
              <div className="user-avatar">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            background: "var(--secondary-white)",
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
