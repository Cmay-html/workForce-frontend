import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import AdminDashboard from './Pages/AdminDashboard';
import UserManagement from './Pages/admin/UserManagement';
import LandingPage from './Pages/LandingPage';
import PrivacyPolicy from './Pages/PrivacyPolicy';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('User in AdminRoute:', user); // Debug to check user value
  return user?.role === 'admin' ? children : <Navigate to="/unauthorized" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy />}/>
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;