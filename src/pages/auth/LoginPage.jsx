import React, { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={styles.page}>
      {/* Left side - Form */}
      <div style={styles.leftSection}>
        <div style={styles.card}>
          <h1 style={styles.logo}>Kazi Flow</h1>
          <p style={styles.subtitle}>
            {isLogin ? 'Welcome back! Please log in to continue.' : 'Create your Kazi Flow account'}
          </p>

          <form style={styles.form}>
            <input type="email" placeholder="Email address" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />

            {!isLogin && (
              <input type="password" placeholder="Confirm Password" style={styles.input} />
            )}

            <button type="submit" style={styles.button}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p style={styles.toggle}>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span style={styles.link} onClick={() => setIsLogin(false)}>
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span style={styles.link} onClick={() => setIsLogin(true)}>
                  Log in
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right side - Hero */}
      <div style={styles.rightSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Welcome to Kazi Flow</h2>
          <p style={styles.heroText}>
            Find the right talent or your next big opportunity — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {

  
  page: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f9fafb',
    width: '118%',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  },

  leftSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: '4rem 3rem',
  },

  rightSection: {
    flex: 1,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f97316',
    padding: '4rem 3rem',
  },

  card: {
    width: '250vh',
    maxWidth: '480px',
    background: '#fff',
    padding: '2.5rem 2rem',
  },

  heroContent: {
    maxWidth: '550px',
    textAlign: 'center',
    color: '#fff',
    padding: '2rem',
  },

  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  },

  heroText: {
    fontSize: '1.25rem',
    lineHeight: '1.8',
    opacity: '0.95',
  },

  logo: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
    letterSpacing: '-0.5px',
  },

  subtitle: {
    color: '#6b7280',
    marginBottom: '2.5rem',
    fontSize: '1.05rem',
    lineHeight: '1.6',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },

  input: {
    padding: '1rem 1.25rem',
    fontSize: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.75rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    backgroundColor: '#ffffff',
  },

  button: {
    marginTop: '0.75rem',
    padding: '1.1rem 1.25rem',
    fontSize: '1.05rem',
    fontWeight: '600',
    backgroundColor: '#f97316',
    border: 'none',
    borderRadius: '0.75rem',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.1s',
  },

  toggle: {
    marginTop: '2rem',
    fontSize: '0.95rem',
    color: '#6b7280',
    lineHeight: '1.5',
  },

  link: {
    color: '#f97316',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};