import React, { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setAnimating(false);
    }, 300);
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          {/* Dynamic animation */}
          <div
            style={{
              ...styles.formCard,
              transform: animating ? "scale(0.95)" : "scale(1)",
              opacity: animating ? 0.7 : 1,
            }}
          >
            <div style={styles.header}>
              <h1 style={styles.title}>Kazi Flow</h1>
              <p style={styles.description}>
                {isLogin ? "Sign in to your account" : "Create a new account"}
              </p>
            </div>

            {/* FORM */}
            <form style={styles.form}>
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  style={styles.input}
                />
              </div>

              {!isLogin && (
                <div style={styles.inputGroup}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    style={styles.input}
                  />
                </div>
              )}

              <button type="submit" style={styles.button}>
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            {/* TOGGLE */}
            <div style={styles.footer}>
              <p style={styles.switchText}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span style={styles.switchLink} onClick={handleToggle}>
                  {isLogin ? " Sign up" : " Sign in"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "145%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },
  background: {
    position: "relative",
    width: "100%",
    height: "100%",
    background: "#D85A3E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(2px)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
  },
  formCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "3rem 2.5rem",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "0.5rem",
    letterSpacing: "-0.5px",
  },
  description: {
    color: "#64748b",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "1.25rem 1.5rem",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  button: {
    marginTop: "1rem",
    padding: "1.25rem 1.5rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    background: "#D85A3E",
    border: "none",
    borderRadius: "12px",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "#F3F7F0",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
  },
  switchText: {
    fontSize: "0.95rem",
    color: "#64748b",
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

