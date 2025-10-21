"// src/Pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import AuthForm from '../components/Auth/AuthForm';

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
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mx-auto shadow-2xl shadow-blue-500/30 flex items-center justify-center">
              <span className="text-white font-bold text-xl">KF</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-3">
            KaziFlow
          </h1>
          <p className="text-slate-300 text-lg font-light tracking-wide">
            Workflow Intelligence Platform
          </p>
        </div>
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl shadow-black/20 p-8">
          <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;"