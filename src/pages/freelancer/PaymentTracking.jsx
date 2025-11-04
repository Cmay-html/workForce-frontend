import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FreelancerLayout from '../../components/layouts/FreelancerLayout';

const PaymentTracking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [earningsStats, setEarningsStats] = useState({
    totalEarnings: 0,
    pendingPayments: 0,
    thisMonthEarnings: 0,
    averageEarnings: 0
  });

  useEffect(() => {
    const loadPayments = async () => {
      try {
        // TODO: Replace with actual API call to fetch payment data
        const response = await fetch('/api/freelancer/payments', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }

        const data = await response.json();
        setPayments(data.payments || []);
        setEarningsStats(data.earningsStats || {
          totalEarnings: 0,
          pendingPayments: 0,
          thisMonthEarnings: 0,
          averageEarnings: 0
        });
      } catch (error) {
        console.error('Error loading payments:', error);
        setPayments([]);
        setEarningsStats({
          totalEarnings: 0,
          pendingPayments: 0,
          thisMonthEarnings: 0,
          averageEarnings: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleLogout = () => {
    // Clear authentication and navigate to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('proposals');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <FreelancerLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Tracking
          </h1>
          <p className="text-gray-600">
            Monitor your earnings and payment history.
          </p>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsStats.totalEarnings)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsStats.pendingPayments)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsStats.thisMonthEarnings)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Average</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsStats.averageEarnings)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
            <p className="text-sm text-gray-500">Your latest payment transactions</p>
          </div>
          <div className="p-6">
            {/* Payment list content */}
            <div className="space-y-4">
              {/* Mock payment items */}
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-commerce Project Payment</p>
                    <p className="text-sm text-gray-500">Jan 15, 2024</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">+$2,400</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Withdrawal Methods</h3>
              <p className="text-sm text-gray-500">Manage your payment withdrawal options</p>
            </div>
            <div className="p-6">
              {/* Withdrawal methods content */}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Next Payout</h3>
              <p className="text-sm text-gray-500">Information about your upcoming payment</p>
            </div>
            <div className="p-6">
              {/* Next payout content */}
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default PaymentTracking;
