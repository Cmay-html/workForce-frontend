import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link. Missing token or email.');
      return;
    }

    const verifyUserEmail = async () => {
      try {
        const result = await verifyEmail(token, email);
        if (result.success) {
          setStatus('success');
          setMessage('Email verified successfully! You can now log in.');
          // Redirect to login after 3 seconds
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setStatus('error');
          setMessage(result.error || 'Email verification failed.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during verification.');
      }
    };

    verifyUserEmail();
  }, [searchParams, verifyEmail, navigate]);

  const handleResendVerification = async () => {
    const email = searchParams.get('email');
    if (email) {
      // In a real app, this would call an API to resend verification
      setMessage('Verification email sent! Please check your inbox.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6" style={{ minWidth: '1024px' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">KF</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Email Verification
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <div className="text-center">
            {status === 'verifying' && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your email...</h2>
                <p className="text-gray-600">Please wait while we verify your email address.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <p className="text-sm text-gray-500">Redirecting to login page...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className="space-y-3">
                  <button
                    onClick={handleResendVerification}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Resend Verification Email
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Back to Registration
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;