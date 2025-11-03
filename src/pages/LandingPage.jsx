import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                WorkforceFlow
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a
                href="#features"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                Features
              </a>
              {/* <a href="#pricing" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300">Pricing</a> */}
              <a
                href="#about"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                About
              </a>
              <Link
                to="/login"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-700 hover:shadow-md transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                className="text-gray-700 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-2 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 animate-slide-in">
              <a
                href="#features"
                className="block text-gray-700 hover:text-orange-600 font-medium py-3 transition-colors duration-300"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-gray-700 hover:text-orange-600 font-medium py-3 transition-colors duration-300"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-orange-600 font-medium py-3 transition-colors duration-300"
              >
                About
              </a>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-orange-600 font-medium py-3 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-700 transition-all duration-300 text-center mt-2"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in">
                Connect with
                <span className="block bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  Top Workers
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
                The most trusted workforce platform. Manage projects, track
                milestones, and get paid securely. Join thousands of successful
                workers and clients worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/register"
                  className="bg-orange-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-orange-700 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                >
                  Start Your Project
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-orange-600 text-orange-600 px-8 py-3.5 rounded-full font-semibold hover:bg-orange-600 hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                >
                  Join as Worker
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-orange-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure payments
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-orange-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 support
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://i.pinimg.com/736x/2b/eb/06/2beb06cd5d920605484f9dabcbb009d0.jpg"
                  alt="Workforce collaboration"
                  className="w-full h-99 object-cover rounded-2xl shadow-2xl"
                />
                {/* Gradient overlay to blend with background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100/80 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Powerful features designed to streamline your workforce workflow
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    ></path>
                  </svg>
                ),
                title: "Milestone Payments",
                description:
                  "Secure escrow payments released only after milestone approval. No more payment disputes.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                ),
                title: "Real-Time Collaboration",
                description:
                  "Built-in chat, file sharing, and progress tracking for seamless project management.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                ),
                title: "Smart Time Tracking",
                description:
                  "Advanced productivity tools with automatic time logging and detailed work reports.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                ),
                title: "Enterprise Security",
                description:
                  "Bank-level security with role-based access control and encrypted communications.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                ),
                title: "Analytics Dashboard",
                description:
                  "Comprehensive insights into project performance, earnings, and productivity metrics.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                ),
                title: "Verified Professionals",
                description:
                  "All workers are vetted and verified. Work with confidence and peace of mind.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from professionals who've
              transformed their workflow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Joshua Meikan",
                role: "Freelance Designer",
                image: "SJ",
                review:
                  "WorkforceFlow has completely transformed how I manage my freelance business. The milestone payment system gives me peace of mind, and I've never had to worry about getting paid. The platform is intuitive and the support team is amazing!",
                rating: 5,
              },
              {
                name: "David James",
                role: "Software Development Agency Owner",
                image: "MC",
                review:
                  "As a client, finding reliable freelancers was always a challenge. WorkforceFlow's verification system and project management tools have made it so easy to collaborate with talented professionals. We've completed over 50 projects through this platform!",
                rating: 5,
              },
              {
                name: "Chumo Kamau",
                role: "Content Writer & Strategist",
                image: "ER",
                review:
                  "I love the transparency and security this platform provides. The real-time chat feature keeps communication smooth, and the analytics dashboard helps me track my earnings and productivity. It's been a game-changer for my freelance career!",
                rating: 5,
              },
              {
                name: "Dante",
                role: "Marketing Consultant",
                image: "DT",
                review:
                  "The best freelance platform I've used in 10 years! The escrow system protects both parties, the interface is clean and professional, and I've built long-term relationships with clients I met here. Highly recommend to any serious professional.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 md:py-28 bg-gray-50"
        aria-labelledby="about-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              About WorkforceFlow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empowering businesses and freelancers to collaborate seamlessly in
              the digital economy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At WorkforceFlow, we believe in connecting the right talent with
                the right opportunities. Our platform provides a secure,
                transparent, and efficient way for businesses to find skilled
                freelancers and for professionals to showcase their expertise.
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose Us?
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure milestone-based payments
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified professionals
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced project management tools
                </li>
              </ul>
            </div>
            <div className="neumorphic p-8 rounded-2xl">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Our Impact
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      50K+
                    </div>
                    <div className="text-gray-600 text-sm">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      $10M+
                    </div>
                    <div className="text-gray-600 text-sm">
                      Payments Processed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      150+
                    </div>
                    <div className="text-gray-600 text-sm">
                      Countries Served
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      99.9%
                    </div>
                    <div className="text-gray-600 text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-center">
            {[
              { value: "50K+", label: "Active Workers" },
              { value: "100K+", label: "Projects Completed" },
              { value: "$2M+", label: "Paid Out" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center animate-count-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl sm:text-4xl font-extrabold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-orange-600 to-orange-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-900/10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in">
            Ready to Transform Your Workforce Career?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-orange-100 max-w-2xl mx-auto leading-relaxed">
            Join the platform trusted by thousands of professionals worldwide.
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-orange-600 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-orange-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
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
              <h3 className="text-lg font-bold mb-4 text-orange-500">
                WorkforceFlow
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting talent with opportunity, one project at a time.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://twitter.com"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wide">
                Platform
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/find-work"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Find Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/post-project"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Post Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/enterprise"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wide">
                Support
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/help-center"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/status"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie-policy"
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 WorkforceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
