import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

// Simple SVG icons as components
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#c2f8ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,6 12,13 2,6" stroke="#c2f8ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#c2f8ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="16" r="1" fill="#c2f8ed"/>
    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#c2f8ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => setIsLogin(!isLogin);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // handle login logic
    console.log("Login submitted");
    navigate("/dashboard"); // Navigate to dashboard on successful login
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // handle signup logic
    console.log("Signup submitted");
    navigate("/dashboard"); // Navigate to dashboard on successful signup
  };

  return (
    <div className="auth-form-wrapper">
      <div className="form-container">
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <div className="form-section">
          {isLogin ? (
            <>
              <div className="form-title">
                <div>Login Form</div>
              </div>
              <form className="login" onSubmit={handleLoginSubmit}>
                <div className="field">
                  <div className="input-wrapper">
                    <EmailIcon />
                    <input type="text" placeholder="Email Address" required />
                  </div>
                </div>
                <div className="field">
                  <div className="input-wrapper">
                    <LockIcon />
                    <input type="password" placeholder="Password" required />
                  </div>
                </div>
                <div className="forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="btn">
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Not a member? <a href="#" onClick={() => setIsLogin(false)}>Signup now</a>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="form-title">
                <div>Signup Form</div>
              </div>
              <form className="signup" onSubmit={handleSignupSubmit}>
                <div className="field">
                  <div className="input-wrapper">
                    <EmailIcon />
                    <input type="text" placeholder="Email Address" required />
                  </div>
                </div>
                <div className="field">
                  <div className="input-wrapper">
                    <LockIcon />
                    <input type="password" placeholder="Password" required />
                  </div>
                </div>
                <div className="field">
                  <div className="input-wrapper">
                    <LockIcon />
                    <input type="password" placeholder="Confirm password" required />
                  </div>
                </div>
                <div className="btn">
                  <input type="submit" value="Signup" />
                </div>
                <div className="login-link">
                  Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
