import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthForm from '../../components/shared/auth/AuthForm';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login({
        email: formData.email,
        firstName: 'John',
        lastName: 'Doe'
      }, 'client');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6" style={{ minWidth: '1024px' }}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">KF</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            KaziFlow
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Workflow Intelligence Platform
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
