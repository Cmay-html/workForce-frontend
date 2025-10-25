import React, { useEffect, useState } from 'react';
import adminApi from '../../services/adminApi';
import Navbar from '../../components/Navbar.jsx';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    adminApi.getUsers(page).then(response => setUsers(response.data.users));
  }, [page]);

  const handleDelete = (id) => {
    if (window.confirm('Delete user?')) {
      adminApi.deleteUser(id).then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
    }
  };

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full border-collapse border mb-6">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple pagination (for demo) */}
      <div>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className="bg-gray-300 px-2 py-1 mr-2 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="bg-gray-300 px-2 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;