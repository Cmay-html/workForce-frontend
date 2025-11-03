import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', role: 'client', password: '' });
  const [disputeId, setDisputeId] = useState('');
  const [resolution, setResolution] = useState('');
  const [disputeError, setDisputeError] = useState('');
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchDisputes();
    }
  }, [currentPage, token]);

  const fetchUsers = async () => {
    try {
      //  Added params for pagination
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, per_page: perPage }
      });
      console.log('Users response:', response.data);
      //Access the 'items' array from the response data
      setUsers(response.data.items || []);
      //  Get total pages from the API response
      setTotalPages(response.data.pages || 1);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Fetch users error:', err);
    }
  };

  const fetchDisputes = async () => {
    try {
      // Added params for pagination (optional but good practice)
      const response = await axios.get('http://localhost:5000/api/admin/disputes', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, per_page: 10 } // Or use another pagination state for disputes
      });
      console.log('Disputes response:', response.data);
      // Access the 'items' array from the response data
      setDisputes(response.data.items || []);
    } catch (err) {
      console.error('Fetch disputes error:', err);
      setError('Failed to fetch disputes');
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = selectedUser ? `http://localhost:5000/api/admin/users/${selectedUser.id}` : 'http://localhost:5000/api/admin/users';
      const method = selectedUser ? 'put' : 'post';
      const dataToSend = { ...formData };
      if (selectedUser && !dataToSend.password) {
        delete dataToSend.password;
      }
      await axios({ method, url, data: dataToSend, headers: { Authorization: `Bearer ${token}` } });
      setSelectedUser(null);
      setFormData({ email: '', role: 'client', password: '' });
      fetchUsers();
    } catch (err) {
      setError(`Failed to ${selectedUser ? 'update' : 'create'} user: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ email: user.email || '', role: user.role || 'client', password: '' });
  };

  const handleResolveDispute = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/disputes/${disputeId}/resolve`, { resolution }, { headers: { Authorization: `Bearer ${token}` } });
      setDisputeId('');
      setResolution('');
      fetchDisputes();
      alert('Dispute resolved successfully');
    } catch (err) {
      setDisputeError('Failed to resolve dispute');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!token) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-dark-blue-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 min-h-screen p-6 bg-dark-blue-800 shadow-xl sticky top-0 overflow-y-auto">
        <h2 className="text-4xl font-bold mb-6 text-orange-400">Admin Panel</h2>
        <div className="flex space-x-4 mb-6">
          <button onClick={handleLogout} className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-600">
            Logout
          </button>
          <a href="/admin/analytics" className="py-2 px-4 text-orange-400 hover:text-orange-300">
            Analytics
          </a>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}
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
              <button type="submit" className="flex-1 py-2 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400">{selectedUser ? 'Update User' : 'Create User'}</button>
              {selectedUser && (<button type="button" onClick={() => { setSelectedUser(null); setFormData({ email: '', role: 'client', password: '' }); }} className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">Cancel</button>)}
            </div>
          </form>
        </div>
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
              <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} required className="w-full p-2 rounded bg-dark-blue-600 text-white border border-orange-500" rows="4"/>
            </div>
            <button type="submit" className="w-full py-2 bg-orange-500 text-dark-blue-900 font-bold rounded hover:bg-orange-400">Resolve</button>
          </form>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-dark-blue-800 p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-6 text-orange-400">User List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-dark-blue-700">
                  <th className="px-4 py-2 text-left text-orange-300">Email</th>
                  <th className="px-4 py-2 text-left text-orange-300">Role</th>
                  <th className="px-4 py-2 text-left text-orange-300">Created At</th>
                  <th className="px-4 py-2 text-left text-orange-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? users.map(user => (
                  <tr key={user.id} className="border-b border-dark-blue-700">
                    <td className="px-4 py-3 text-white">{user.email}</td>
                    <td className="px-4 py-3 text-white capitalize">{user.role}</td>
                    <td className="px-4 py-3 text-white">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleEdit(user)} className="mr-2 py-1 px-3 bg-blue-700 text-white rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="py-1 px-3 bg-red-700 text-white rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-4 text-orange-200">No users found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-dark-blue-700 rounded disabled:opacity-50">Previous</button>
            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-dark-blue-700 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
        <div className="bg-dark-blue-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-orange-400">Open Disputes</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-dark-blue-700">
                  <th className="px-4 py-2 text-left text-orange-300">ID</th>
                  <th className="px-4 py-2 text-left text-orange-300">Status</th>
                  <th className="px-4 py-2 text-left text-orange-300">Description</th>
                  <th className="px-4 py-2 text-left text-orange-300">Created At</th>
                  <th className="px-4 py-2 text-left text-orange-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {disputes && disputes.length > 0 ? disputes.map(dispute => (
                  <tr key={dispute.id} className="border-b border-dark-blue-700">
                    <td className="px-4 py-3 text-white">{dispute.id}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-sm ${dispute.status === 'open' ? 'bg-yellow-600' : dispute.status === 'resolved' ? 'bg-green-600' : 'bg-red-600'}`}>{dispute.status || 'pending'}</span></td>
                    <td className="px-4 py-3 text-white">{dispute.description || 'No description'}</td>
                    <td className="px-4 py-3 text-white">{dispute.created_at ? new Date(dispute.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setDisputeId(dispute.id)} className="py-1 px-3 bg-yellow-600 text-white rounded hover:bg-yellow-500">Resolve</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="text-center py-4 text-orange-200">No open disputes</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;