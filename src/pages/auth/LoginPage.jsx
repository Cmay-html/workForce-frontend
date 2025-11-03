import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loadingState, setLoadingState] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    setError('');

    const result = await login(form.email, form.password);

    if (result.success) {
      const redirectPath = result.user.role === 'client'
        ? '/client/dashboard'
        : '/freelancer/dashboard';
      navigate(redirectPath);
    } else {
      setError(result.error || 'Login failed');
    }

    setLoadingState(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Left Side - Image/Branding */}
        <div style={styles.leftSide}>
          <div style={styles.circle1}></div>
          <div style={styles.circle2}></div>
          <div style={styles.circle3}></div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.rightSide}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Welcome Back</h2>
              <p style={styles.formSubtitle}>
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitForm} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.labelContainer}>
                  <label style={styles.label}>Password</label>
                  <span style={styles.forgotLink} onClick={() => navigate('/forgot-password')}>
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <button
                type="submit"
                disabled={loadingState}
                style={{
                  ...styles.submitButton,
                  ...(loadingState ? styles.submitButtonLoading : {})
                }}
              >
                {loadingState ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div style={styles.divider}>
              <span style={styles.dividerText}>or continue with</span>
            </div>

            {/* Social Login */}
            <div style={styles.socialButtons}>
              <button style={styles.socialButton}>
                <span style={styles.socialIcon}>G</span>
                Google
              </button>
              <button style={styles.socialButton}>
                <span style={styles.socialIcon}>G</span>
                GitHub
              </button>
            </div>

            {/* Sign up link */}
            <div style={styles.footer}>
              <p style={styles.switchText}>
                Don't have an account?{' '}
                <span
                  style={styles.switchLink}
                  onClick={() => navigate('/register')}
                >
                  Sign up for free
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
    padding: "2rem",
    boxSizing: "border-box",
  },

  loginCard: {
    display: "flex",
    width: "100%",
    maxWidth: "750px",
    height: "70vh",
    overflow: "hidden",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },

  leftSide: {
    flex: "0 0 45%",
    background: `url('https://i.pinimg.com/1200x/9b/7f/a2/9b7fa25193e0b7efed42c0dc3f97061d.jpg') center/cover`,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  circle1: {
    position: "absolute",
    top: "15%",
    left: "15%",
    width: "120px",
    height: "120px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite",
  },

  circle2: {
    position: "absolute",
    bottom: "25%",
    right: "15%",
    width: "90px",
    height: "90px",
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: "50%",
    animation: "float 8s ease-in-out infinite 1s",
  },

  circle3: {
    position: "absolute",
    top: "65%",
    right: "35%",
    width: "60px",
    height: "60px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "50%",
    animation: "float 5s ease-in-out infinite 0.5s",
  },

  rightSide: {
    flex: "0 0 55%",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    borderTopRightRadius: "24px",
    borderBottomRightRadius: "24px",
  },

  formContainer: {
    width: "100%",
    maxWidth: "100%",
    background: "#ffffff",
    padding: "0",
    borderRadius: "0",
    border: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },

  formHeader: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },

  formTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1a202c",
    margin: "0 0 0.5rem 0",
    letterSpacing: "-0.02em",
  },

  formSubtitle: {
    fontSize: "0.9rem",
    color: "#718096",
    margin: 0,
    fontWeight: "400",
    lineHeight: "1.4",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  labelContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },

  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "0.5rem",
  },

  forgotLink: {
    fontSize: "0.85rem",
    color: "#f97316",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "0.9rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#2d3748",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },

  submitButton: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    background: "linear-gradient(135deg, #fed7aa 0%, #fb923c 50%, #f97316 100%)",
    border: "none",
    borderRadius: "10px",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "0.5rem",
    boxShadow: "0 4px 15px rgba(249, 115, 22, 0.3)",
  },

  submitButtonLoading: {
    opacity: 0.8,
    cursor: "not-allowed",
  },

  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },

  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  errorMessage: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontSize: "14px",
    fontWeight: "500",
  },

  divider: {
    position: "relative",
    textAlign: "center",
    margin: "1rem 0",
    color: "#a0aec0",
    fontSize: "0.8rem",
  },

  dividerText: {
    background: "#ffffff",
    padding: "0 1rem",
  },

  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    marginBottom: "1rem",
  },

  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    padding: "10px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#4a5568",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  socialIcon: {
    fontSize: "1rem",
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
  },

  switchText: {
    fontSize: "0.8rem",
    color: "#718096",
    margin: 0,
  },

  switchLink: {
    color: "#f97316",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
};

// Add keyframes for animations
const keyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject keyframes
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);
}

export default LoginPage;
