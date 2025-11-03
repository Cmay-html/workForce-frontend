// src/Pages/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', role: 'user' });
  const [viewAll, setViewAll] = useState(false);
  const { user: authUser } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, [viewAll]);

  const fetchUsers = async () => {
    try {
      const perPage = viewAll ? 9999 : 10; // Large number to simulate "all" users
      const response = await axios.get(`http://localhost:5000/api/admin/users?page=1&per_page=${perPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.items || []);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = selectedUser
        ? `http://localhost:5000/api/admin/users/${selectedUser.id}`
        : 'http://localhost:5000/api/admin/users';
      const method = selectedUser ? 'put' : 'post';
      await axios({ method, url, data: formData, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
      setSelectedUser(null);
      setFormData({ email: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      setError(`Failed to ${selectedUser ? 'update' : 'create'} user`);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ email: user.email, role: user.role });
  };

  const handleView = (user) => {
    // Simulate viewing user details (e.g., log to console or navigate)
    console.log('Viewing user:', user);
    // You can replace this with a navigation or modal to show details
    alert(`Viewing ${user.email} (Role: ${user.role})`);
  };

  return (
    <div className="min-h-screen bg-dark-blue-900 text-white p-6 flex flex-col h-screen">
      <h2 className="text-4xl font-bold mb-6 text-orange-400">User Management</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* View All Button */}
      <button
        onClick={() => setViewAll(!viewAll)}
        className="mb-6 py-2 px-4 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400 transition duration-200"
      >
        {viewAll ? 'View Limited Users' : 'View All Users'}
      </button>

      {/* CRUD Form */}
      <div className="bg-dark-blue-800 p-6 rounded-lg shadow-lg mb-6 flex-1">
        <h3 className="text-2xl font-semibold mb-4 text-orange-300">
          {selectedUser ? 'Edit User' : 'Add New User'}
        </h3>
        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
          <div>
            <label className="block text-orange-200">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-3 rounded bg-dark-blue-700 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-orange-200">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-3 rounded bg-dark-blue-700 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="space-x-4">
            <button
              type="submit"
              className="w-1/2 py-3 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400 transition duration-200"
            >
              {selectedUser ? 'Update User' : 'Create User'}
            </button>
            {selectedUser && (
              <button
                type="button"
                onClick={() => { setSelectedUser(null); setFormData({ email: '', role: 'user' }); }}
                className="w-1/2 py-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4">
          {users.length > 0 ? (
            users.map(user => (
              <li key={user.id} className="flex items-center justify-between p-4 bg-dark-blue-800 rounded-lg shadow-md">
                <div>
                  <span className="text-orange-300">{user.email}</span> (Role: <span className="text-white">{user.role}</span>)
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleView(user)}
                    className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-orange-200">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;