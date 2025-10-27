// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext'; 
import AdminDashboard from './Pages/AdminDashboard';
import UserManagement from './Pages/admin/UserManagement';
import AdminLogin from './Pages/AdminLogin';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth(); 
  console.log('User in AdminRoute:', user);
  if (loading) return <div>Loading...</div>;
  return user?.role === 'admin' ? children : <Navigate to="/unauthorized" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;