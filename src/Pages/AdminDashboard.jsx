import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // . Add state for disputes
  const [disputes, setDisputes] = useState([]); 
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  //  Default role is now 'client' to match backend
  const [formData, setFormData] = useState({ email: '', role: 'client', password: '' }); 
  const [disputeId, setDisputeId] = useState('');
  const [resolution, setResolution] = useState('');
  const [disputeError, setDisputeError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
    //  Call fetchDisputes when the component loads
    fetchDisputes();
  }, [token]); // Add token as a dependency to refetch if it changes

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users?page=1&per_page=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.items || []);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  // Add a function to fetch the list of disputes
  const fetchDisputes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/disputes?page=1&per_page=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDisputes(response.data.items || []);
    } catch (err) {
      setError('Failed to fetch disputes');
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
      
      const dataToSend = { ...formData };
      // Don't send an empty password on update unless it's being changed
      if (selectedUser && !dataToSend.password) {
        delete dataToSend.password;
      }
      
      await axios({ method, url, data: dataToSend, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
      setSelectedUser(null);
      setFormData({ email: '', role: 'client', password: '' });
      fetchUsers();
    } catch (err) {
      setError(`Failed to ${selectedUser ? 'update' : 'create'} user: ${err.response?.data?.message || err.message}`);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter out the deleted user from the local state for a faster UI update
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ email: user.email, role: user.role, password: '' });
  };

  const handleResolveDispute = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/disputes/${disputeId}/resolve`, {
        resolution,
      }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setDisputeId('');
      setResolution('');
      fetchDisputes(); // Refresh the disputes list after resolving one
      alert('Dispute resolved successfully');
    } catch (err) {
      setDisputeError('Failed to resolve dispute');
      console.error(err);
    }
  };

  const handleLogout = () => {
    const lastEmail = 'admin@example.com'; 
    const lastPassword = 'adminpass';
    logout();
    localStorage.setItem('lastAdminEmail', lastEmail); 
    localStorage.setItem('lastAdminPassword', lastPassword);
    navigate('/admin/login', { state: { email: lastEmail, password: lastPassword } });
  };

  return (
    <div className="min-h-screen w-full bg-dark-blue-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 min-h-screen p-6 bg-dark-blue-800 shadow-xl sticky top-0 overflow-y-auto">
        <h2 className="text-4xl font-bold mb-6 text-orange-400">Admin Panel</h2>
        <div className="flex space-x-4 mb-6">
          <button onClick={handleLogout} className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-600">
            Logout
          </button>
          <a href="/admin/analytics" className="py-2 px-4 text-orange-400 hover:text-orange-300">Analytics</a>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        
        {/* User Management Form */}
        <div className="bg-dark-blue-700 p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-orange-300">User Management</h3>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div>
              <label className="block text-orange-200">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full p-2 rounded bg-dark-blue-600 text-white border border-orange-500"/>
            </div>
            <div>
              <label className="block text-orange-200">Role</label>
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full p-2 rounded bg-dark-blue-600 text-white border border-orange-500">
                {/* 4. (Correction) Change role options to match backend */}
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-orange-200">Password</label>
              <input type="password" value={formData.password} placeholder={selectedUser ? "New password (optional)" : "Required"} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!selectedUser} className="w-full p-2 rounded bg-dark-blue-600 text-white border border-orange-500"/>
            </div>
            <div className="space-x-2 flex">
              <button type="submit" className="flex-1 py-2 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400">
                {selectedUser ? 'Update User' : 'Create User'}
              </button>
              {selectedUser && (
                <button type="button" onClick={() => { setSelectedUser(null); setFormData({ email: '', role: 'client', password: '' }); }} className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Resolve Dispute Form */}
        <div className="bg-dark-blue-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-orange-300">Resolve Dispute</h3>
          {disputeError && <p className="text-red-400 mb-4">{disputeError}</p>}
          <form onSubmit={handleResolveDispute} className="space-y-4">
            <div>
              <label className="block text-orange-200">Dispute ID</label>
              <input type="text" value={disputeId} onChange={(e) => setDisputeId(e.target.value)} required className="w-full p-2 rounded bg-dark-blue-600 text-white border border-orange-500"/>
            </div>
            <div>
              <label className="block text-orange-200">Resolution</label>
              <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} required className="w-full p-2 rounded bg-dark-blue-600 text-white border border-orange-500" />
            </div>
            <button type="submit" className="w-full py-2 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400">
              Resolve
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* User List */}
        <div className="bg-dark-blue-800 p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-6 text-orange-400">User List</h1>
          <ul className="space-y-4">
            {users.length > 0 ? users.map(user => (
              <li key={user.id} className="flex items-center justify-between p-4 bg-dark-blue-700 rounded-lg">
                <div>
                  <span className="text-orange-300 font-semibold">{user.email}</span>
                  <span className="ml-4 text-sm text-white capitalize">(Role: {user.role})</span>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(user)} className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </li>
            )) : <li className="text-center text-orange-200">No users found.</li>}
          </ul>
        </div>
        
        {/* 5. Add JSX to display the list of disputes */}
        <div className="bg-dark-blue-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-orange-400">Open Disputes</h1>
          <ul className="space-y-4">
            {disputes.length > 0 ? disputes.map(dispute => (
              <li key={dispute.id} className="p-4 bg-dark-blue-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 font-semibold">Dispute ID: {dispute.id}</p>
                    <p className="text-white">Status: <span className="font-bold capitalize">{dispute.status}</span></p>
                  </div>
                  <button onClick={() => setDisputeId(dispute.id)} className="py-2 px-4 bg-yellow-600 text-white rounded hover:bg-yellow-500">
                    Resolve This
                  </button>
                </div>
                <p className="mt-2 text-gray-300">Description: {dispute.description}</p>
              </li>
            )) : <li className="text-center text-orange-200">No open disputes.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;