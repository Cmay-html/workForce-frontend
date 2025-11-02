import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import adminService from '../../services/api/adminService';
import Navbar from '../../components/shared/dashboard/Navbar';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    adminService.getAnalytics().then(setAnalytics);
  }, []);

  const data = [
    { name: 'Clients', value: analytics.total_users || 0 },
    { name: 'Ongoing Projects', value: analytics.ongoing_projects || 0 },
  ];
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Total Users: {analytics.total_users}</div>
        <div className="bg-white p-4 rounded shadow">Ongoing Projects: {analytics.ongoing_projects}</div>
        <div className="bg-white p-4 rounded shadow">Revenue: ${analytics.revenue}</div>
      </div>
      <PieChart width={400} height={400}>
        <Pie data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default AnalyticsDashboard;
