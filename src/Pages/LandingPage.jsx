import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">WorkforceFlow</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">About</a>
              <Link to="/login" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Sign In</Link>
              <Link to="/register" className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200">
                Get Started
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} aria-label="Toggle navigation menu" className="text-gray-600 hover:text-orange-500 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
              <a href="#features" className="block text-gray-600 hover:text-orange-500 py-2 transition-colors duration-200">Features</a>
              <a href="#pricing" className="block text-gray-600 hover:text-orange-500 py-2 transition-colors duration-200">Pricing</a>
              <a href="#about" className="block text-gray-600 hover:text-orange-500 py-2 transition-colors duration-200">About</a>
              <Link to="/login" className="block text-gray-600 hover:text-orange-500 py-2 transition-colors duration-200">Sign In</Link>
              <Link to="/register" className="block bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 text-center">Get Started</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect with
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Top Workers
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The most trusted workforce platform. Manage projects, track milestones, and get paid securely.
              Join thousands of successful workers and clients worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 hover:shadow-lg transition-all duration-300">
                Start Your Project
              </Link>
              <Link to="/register" className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                Join as Worker
              </Link>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure payments
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 support
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-70"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your workforce workflow
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Milestone Payments</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Secure escrow payments released only after milestone approval. No more payment disputes.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Collaboration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Built-in chat, file sharing, and progress tracking for seamless project management.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Time Tracking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Advanced productivity tools with automatic time logging and detailed work reports.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Bank-level security with role-based access control and encrypted communications.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Comprehensive insights into project performance, earnings, and productivity metrics.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Professionals</h3>
              <p className="text-gray-600 text-sm leading-relaxed">All workers are vetted and verified. Work with confidence and peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">50K+</div>
              <div className="text-gray-300 text-sm">Active Workers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">100K+</div>
              <div className="text-gray-300 text-sm">Projects Completed</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">$2M+</div>
              <div className="text-gray-300 text-sm">Paid Out</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold mb-2">4.9★</div>
              <div className="text-gray-300 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-orange-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-700/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Workforce Career?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Join the platform trusted by thousands of professionals worldwide. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
              Get Started
            </Link>
            <Link to="/login" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-orange-500">WorkforceFlow</h3>
              <p className="text-gray-400 text-sm">
                Connecting talent with opportunity, one project at a time.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/find-work" className="hover:text-orange-500 transition-colors duration-200">Find Work</Link></li>
                <li><Link to="/post-project" className="hover:text-orange-500 transition-colors duration-200">Post Project</Link></li>
                <li><Link to="/enterprise" className="hover:text-orange-500 transition-colors duration-200">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/help-center" className="hover:text-orange-500 transition-colors duration-200">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-orange-500 transition-colors duration-200">Contact Us</Link></li>
                <li><Link to="/status" className="hover:text-orange-500 transition-colors duration-200">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-orange-500 transition-colors duration-200">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-orange-500 transition-colors duration-200">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 WoorkforceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;