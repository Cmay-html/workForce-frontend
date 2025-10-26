// src/components/shared/dashboard/DashboardLayout.jsx
import React from "react";
import { useAuth } from '../../../hooks/useAuth';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const clientName = user?.firstName + ' ' + user?.lastName || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 p-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            Client Dashboard
          </h2>
        </div>
        
        <nav>
          <ul className="space-y-3">
            {[
              { icon: "📊", label: "Overview" },
              { icon: "👤", label: "Profile" },
              { icon: "💼", label: "Projects" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🚪", label: "Logout" }
            ].map((item, index) => (
              <li key={item.label}>
                <button className="w-full text-left text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 flex items-center space-x-3 group hover:translate-x-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;