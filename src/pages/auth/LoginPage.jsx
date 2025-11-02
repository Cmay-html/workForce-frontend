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
      <div style={styles.background}>
        {/* Animated background elements */}
        <div style={styles.backgroundElements}>
          <div style={styles.circle1}></div>
          <div style={styles.circle2}></div>
          <div style={styles.circle3}></div>
        </div>

        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <div style={styles.formCard}>
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.logo}>
                <img src="/logo.svg" alt="WorkforceFlow Logo" style={styles.logoIcon} />
                <h1 style={styles.title}>WorkforceFlow</h1>
              </div>
              <p style={styles.description}>Welcome back! Please login to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.errorMessage}>
                
                {error}
              </div>
            )}

            {/* Form */}
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
                  ...styles.button,
                  ...(loadingState ? styles.buttonLoading : {})
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
                <span style={styles.socialIcon}>🔵</span>
                Google
              </button>
              <button style={styles.socialButton}>
                <span style={styles.socialIcon}>🔵</span>
                GitHub
              </button>
            </div>

            {/* Sign up link */}
            <div style={styles.footer}>
              <p style={styles.switchText}>
                Don't have an account?
                <span
                  style={styles.switchLink}
                  onClick={() => navigate('/register')}
                  onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
                >
                  Sign up now
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
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
  },
  background: {
    position: "relative",
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  circle1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "200px",
    height: "200px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite",
  },
  circle2: {
    position: "absolute",
    bottom: "15%",
    right: "15%",
    width: "150px",
    height: "150px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    animation: "float 8s ease-in-out infinite 1s",
  },
  circle3: {
    position: "absolute",
    top: "50%",
    right: "20%",
    width: "100px",
    height: "100px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "50%",
    animation: "float 5s ease-in-out infinite 0.5s",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(4px)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "440px",
    padding: "2rem",
    animation: "slideUp 0.6s ease-out",
  },
  formCard: {
    background: "rgba(255, 255, 255, 0.98)",
    borderRadius: "24px",
    padding: "3rem 2.5rem",
    boxShadow: `
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1)
    `,
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(20px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  logoIcon: {
    width: "3rem",
    height: "3rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
    background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    color: "#64748b",
    fontSize: "1rem",
    lineHeight: "1.6",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  },
  inputGroup: {
    position: "relative"
  },
  labelContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  forgotLink: {
    fontSize: "0.875rem",
    color: "#f97316",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  input: {
    width: "100%",
    padding: "1rem 1.25rem",
    fontSize: "1rem",
    border: "2px solid #f1f5f9",
    borderRadius: "12px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#000000",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "0.5rem",
    padding: "1rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    border: "none",
    borderRadius: "12px",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
  },
  buttonLoading: {
    opacity: 0.8,
    cursor: "not-allowed",
    transform: "scale(0.98)",
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
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  errorIcon: {
    fontSize: "16px",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "2rem 0",
    color: "#94a3b8",
    fontSize: "0.875rem",
  },
  dividerText: {
    background: "#ffffff",
    padding: "0 1rem",
    display: "inline-block",
  },
  socialButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginBottom: "2rem",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#374151",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  socialIcon: {
    fontSize: "1rem",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center"
  },
  switchText: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: 0
  },
  switchLink: {
    color: "#f97316",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "0.5rem",
    transition: "all 0.2s ease",
    display: "inline-block",
  },
};

// Add these keyframes for animations
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject keyframes
if (styleSheet) {
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

// Also add hover effects
styles.input = {
  ...styles.input,
  ':focus': {
    borderColor: '#f97316',
    boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)',
    transform: 'translateY(-1px)',
  }
};

styles.button = {
  ...styles.button,
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(249, 115, 22, 0.4)',
  }
};

styles.socialButton = {
  ...styles.socialButton,
  ':hover': {
    borderColor: '#f97316',
    transform: 'translateY(-1px)',
  }
};

export default LoginPage;
