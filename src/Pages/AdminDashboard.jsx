import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, resolveDispute } from '../services/adminApi';
import Navbar from '../components/Navbar.jsx';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [dispute, setDispute] = useState({ id: '', resolution: '' });

  useEffect(() => {
    getUsers(page).then(response => setUsers(response.data.users));
  }, [page]);

  const handleDelete = (id) => {
    if (window.confirm('Delete user?')) {
      deleteUser(id).then(() => setUsers(users.filter(u => u.id !== id)));
    }
  };

  const handleResolveDispute = () => {
    resolveDispute({ dispute_id: dispute.id, resolution: dispute.resolution }).then(() => {
      setDispute({ id: '', resolution: '' });
      alert('Dispute resolved');
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Admin Dashboard</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b hover:bg-teal-50">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl text-teal-600 mb-4">Resolve Dispute</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Dispute ID"
              value={dispute.id}
              onChange={(e) => setDispute({ ...dispute, id: e.target.value })}
              className="border border-teal-300 p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Resolution"
              value={dispute.resolution}
              onChange={(e) => setDispute({ ...dispute, resolution: e.target.value })}
              className="border border-teal-300 p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleResolveDispute}
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition duration-200"
            >
              Resolve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;