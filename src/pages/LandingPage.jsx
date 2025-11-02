import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  WorkForceFlow
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                  How It Works
                </a>
                <a href="#categories" className="text-gray-700 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                  Categories
                </a>
                <a href="#success" className="text-gray-700 hover:text-purple-600 px-3 py-2 font-medium transition-colors">
                  Success Stories
                </a>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg border-b">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#how-it-works" className="text-gray-700 block px-3 py-2 font-medium hover:bg-gray-50 rounded-lg">
                How It Works
              </a>
              <a href="#categories" className="text-gray-700 block px-3 py-2 font-medium hover:bg-gray-50 rounded-lg">
                Categories
              </a>
              <a href="#success" className="text-gray-700 block px-3 py-2 font-medium hover:bg-gray-50 rounded-lg">
                Success Stories
              </a>
              <div className="border-t pt-2">
                <Link
                  to="/login"
                  className="w-full text-left text-gray-700 block px-3 py-2 font-medium hover:bg-gray-50 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-left bg-purple-600 text-white block px-3 py-2 font-medium rounded-lg mt-1"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Hire Expert
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"> Freelancers </span>
              <br />
              or Find Your Dream
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Projects</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where talent meets opportunity. No unnecessary fees, no compromises.
              <span className="font-semibold text-purple-600"> Quality work, fair prices.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Hire Talent
              </Link>
              <Link
                to="/register"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all hover:scale-105"
              >
                Find Work
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5,000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>10,000+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>95% Satisfaction Rate</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Graphics Placeholder */}
          <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature Cards */}
              {[
                { icon: '⚡', title: 'AI Matching', desc: 'Smart talent-project matching' },
                { icon: '🛡️', title: 'Secure Payments', desc: 'Escrow protection' },
                { icon: '🌍', title: 'Global Talent', desc: '100+ countries' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps. Whether you're hiring or freelancing, we've made it easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up and create a detailed profile showcasing your skills, experience, and what you're looking for.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect & Collaborate</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse projects or post your own. Our smart matching helps you find the perfect fit.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Work Done</h3>
              <p className="text-gray-600 leading-relaxed">
                Work together securely with milestone payments, messaging, and project management tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the right talent or projects in your field of expertise.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Web Development', icon: '💻', count: '2,500+' },
              { name: 'Design', icon: '🎨', count: '1,800+' },
              { name: 'Writing', icon: '✍️', count: '1,200+' },
              { name: 'Marketing', icon: '📈', count: '950+' },
              { name: 'Mobile Apps', icon: '📱', count: '780+' },
              { name: 'Data Science', icon: '📊', count: '650+' },
              { name: 'Video Editing', icon: '🎬', count: '520+' },
              { name: 'Translation', icon: '🌍', count: '480+' }
            ].map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-all hover:scale-105 border border-purple-100">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-purple-600 text-sm font-medium">{category.count} projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Active Freelancers' },
              { number: '25K+', label: 'Happy Clients' },
              { number: '100K+', label: 'Projects Completed' },
              { number: '4.9/5', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-purple-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="success" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied clients and freelancers who found success on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {'★'.repeat(5)}
                </div>
                <span className="ml-2 text-purple-600 font-semibold">5.0</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "WorkForceFlow helped me find the perfect developer for my startup. The quality of work was outstanding and the platform made communication seamless."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-500 text-sm">Startup Founder</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {'★'.repeat(5)}
                </div>
                <span className="ml-2 text-purple-600 font-semibold">5.0</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "As a freelancer, WorkForceFlow has been a game-changer. I've been able to build my career and work with amazing clients from around the world."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-gray-500 text-sm">Full-Stack Developer</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {'★'.repeat(5)}
                </div>
                <span className="ml-2 text-purple-600 font-semibold">5.0</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The milestone payment system gives me peace of mind. I can focus on delivering great work without worrying about getting paid."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AR
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Anna Rodriguez</div>
                  <div className="text-gray-500 text-sm">Graphic Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our community of clients and freelancers today. No fees, no compromises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all hover:scale-105 shadow-lg"
            >
              Join as Client
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all hover:scale-105"
            >
              Join as Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                WorkForceFlow
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Connecting talent with opportunity worldwide. No unnecessary fees, no compromises.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-purple-400 transition-colors">Post a Project</Link></li>
                <li><Link to="/freelancers" className="hover:text-purple-400 transition-colors">Find Freelancers</Link></li>
                <li><a href="#success" className="hover:text-purple-400 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Freelancers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-purple-400 transition-colors">Find Work</Link></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WorkForceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
