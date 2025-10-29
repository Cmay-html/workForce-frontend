import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">WorkforceFlow</Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Home</Link>
              <Link to="/login" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: October 29, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using WorkforceFlow, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              WorkforceFlow is a platform that connects clients with freelancers for project-based work. We provide tools for project management, payment processing, and communication between parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Registration</h3>
            <p className="text-gray-700 mb-4">
              To use our services, you must register for an account and provide accurate, current, and complete information.
            </p>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Account Security</h3>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Conduct</h2>
            <p className="text-gray-700 mb-4">
              You agree to use the platform in accordance with applicable laws and regulations. Prohibited activities include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Posting false, misleading, or inappropriate content</li>
              <li>Harassing or abusing other users</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using the platform for any fraudulent or illegal purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
            <p className="text-gray-700 mb-4">
              WorkforceFlow facilitates payments between clients and freelancers. We may charge fees for certain services. All payments are processed through secure third-party payment processors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The WorkforceFlow platform and its original content, features, and functionality are owned by WorkforceFlow and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and access to the service immediately, without prior notice, for any reason, including breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall WorkforceFlow be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us at legal@workforceflow.com.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 WorkforceFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;