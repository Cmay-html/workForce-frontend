import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientRegistrationForm from '../../components/shared/auth/ClientRegistrationForm';

const ClientRegistrationPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100%",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
      padding: "2rem 0",
      boxSizing: "border-box",
    },

    content: {
      width: "100%",
      maxWidth: "none",
      padding: "0 2rem",
    },

    formHeader: {
      textAlign: "center",
      marginBottom: "2rem",
    },

    formTitle: {
      fontSize: "2.25rem",
      fontWeight: "700",
      color: "#1a202c",
      margin: "0 0 0.75rem 0",
      letterSpacing: "-0.02em",
    },

    formSubtitle: {
      fontSize: "1rem",
      color: "#718096",
      margin: 0,
      fontWeight: "400",
      lineHeight: "1.5",
    },

    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#f97316",
      background: "none",
      border: "none",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      marginBottom: "1.5rem",
      padding: "0.5rem",
      borderRadius: "8px",
      transition: "all 0.2s ease",
    },

    formWrapper: {
      width: "100%",
    },

    footer: {
      textAlign: "center",
      marginTop: "2rem",
    },

    switchText: {
      fontSize: "0.875rem",
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

  const handleBack = () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button
          style={styles.backButton}
          onClick={handleBack}
          onMouseEnter={(e) => e.target.style.background = '#fff7ed'}
          onMouseLeave={(e) => e.target.style.background = 'none'}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to selection
        </button>

        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>Join as Client</h2>
          <p style={styles.formSubtitle}>
            Create your client profile to start posting projects
          </p>
        </div>

        <div style={styles.formWrapper}>
          <ClientRegistrationForm />
        </div>

        <div style={styles.footer}>
          <p style={styles.switchText}>
            Already have an account?{' '}
            <span
              style={styles.switchLink}
              onClick={() => navigate('/login')}
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientRegistrationPage;
