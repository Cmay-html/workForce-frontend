import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirm: "", role: "" });
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState("auto");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Adjust card height dynamically
  useEffect(() => {
    if (cardRef.current && !isTransitioning) {
      const height = cardRef.current.scrollHeight + 2;
      setCardHeight(`${height}px`);
    }
  }, [isLogin, form, isTransitioning]);

  const handleToggle = () => {
    setIsTransitioning(true);
    setAnimating(true);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setTimeout(() => {
        setAnimating(false);
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin) {
      // Signup validations
      if (!form.role) {
        alert("Please select a role.");
        setLoading(false);
        return;
      }
      if (form.password !== form.confirm) {
        alert("Passwords do not match!");
        setLoading(false);
        return;
      }

      // Simulate email verification
      await new Promise((r) => setTimeout(r, 1000));
      alert(`Verification email sent to ${form.email}! Role: ${form.role}`);

      // Navigate to registration page with role parameter
      navigate(`/register?role=${form.role}`);
    } else {
      // Login flow simulation
      await new Promise((r) => setTimeout(r, 700));
      alert(`Logged in as ${form.email}`);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <div
            ref={cardRef}
            style={{
              ...styles.formCard,
              height: isTransitioning ? "auto" : cardHeight,
              transform: animating ? "scale(0.95)" : "scale(1)",
              opacity: animating ? 0.7 : 1,
              transition: isTransitioning ? "none" : "all 0.35s ease",
            }}
          >
            {/* Header */}
            <div style={styles.header}>
              <h1 style={styles.title}>Kazi Flow</h1>
              <p style={styles.description}>
                {isLogin ? "Login to your account" : "Sign up"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              {!isLogin && (
                <>
                  <div style={styles.inputGroup}>
                    <input
                      type="password"
                      name="confirm"
                      placeholder="Confirm Password"
                      value={form.confirm}
                      onChange={handleChange}
                      required
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      style={{
                        ...styles.input,
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.25em 1.25em",
                        paddingRight: "2rem",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select your role</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="client">Client</option>
                    </select>
                  </div>
                </>
              )}

              <button type="submit" disabled={loading} style={styles.button}>
                {loading ? "Working…" : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Toggle link */}
            <div style={styles.footer}>
              <p style={styles.switchText}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span style={styles.switchLink} onClick={handleToggle}>
                  {isLogin ? " Sign up" : " Login"}
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
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
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
  content: { position: "relative", zIndex: 1, width: "100%", maxWidth: "400px", padding: "2rem" },
  formCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "24px",
    padding: "3rem 2.5rem",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  header: { textAlign: "center", marginBottom: "2.5rem" },
  title: { fontSize: "2.5rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.5rem" },
  description: { color: "#64748b", fontSize: "1rem", lineHeight: "1.5" },
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  inputGroup: { position: "relative" },
  input: {
    width: "100%",
    padding: "1.25rem 1.5rem",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    outline: "none",
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
  },
  footer: { marginTop: "2rem", textAlign: "center" },
  switchText: { fontSize: "0.95rem", color: "#64748b", margin: 0 },
  switchLink: { color: "#f97316", fontWeight: "600", cursor: "pointer" },
};
