import React, { useState } from "react";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const freelancerName = "John Doe"; // Placeholder
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-container dropdown-layout">
      <header className="masthead">
        <div className="brand">
          <span className="logo bright">KF</span>
          <h1>Kazi Flow</h1>
        </div>
        <div className="mast-actions">
          <div className="search">
            <input placeholder="Search projects, clients..." aria-label="Search" />
          </div>
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="nav-dropdown"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? 'Close Menu ▲' : 'Open Menu ▼'}
          </button>
        </div>
      </header>

      <nav id="nav-dropdown" className={`dropdown ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li className="active"><span className="icon">🏠</span><span>Overview</span></li>
          <li><span className="icon">👤</span><span>Profile</span></li>
          <li><span className="icon">📁</span><span>Projects</span></li>
          <li><span className="icon">⚙️</span><span>Settings</span></li>
        </ul>
      </nav>

      <main className="page">
        {/* Profile Header Section */}
        <section className="section profile-header">
          <div className="profile-media">
            <img
              className="profile-photo"
              alt="profile"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(freelancerName)}&background=22d3ee&color=0b1220&size=160`}
            />
          </div>
          <div className="profile-texts">
            <div className="intro">
              <h2>Hi, my name is {freelancerName}</h2>
              <div className="meta">
                <span className="pill">Frontend Engineer</span>
                <span className="dot" />
                <span className="muted">Lagos, NG</span>
              </div>
            </div>
            <p className="welcome">Welcome to my workspace. I craft solutions and deliver value.</p>
            <ul className="highlights">
              <li>5+ years experience</li>
              <li>12 completed projects</li>
              <li>Available for freelance</li>
            </ul>
            <div className="actions">
              <button className="btn primary">Contact Me</button>
              <button className="btn ghost">View Portfolio</button>
            </div>
          </div>
        </section>

        {/* Brief Description with Download CV */}
        <section className="section about">
          <h3>About Me</h3>
          <p>
            I am a passionate Full Stack Developer focused on building performance and accessible web experiences. 
            I enjoy solving complex problems and working with cross-functional teams to ship high-quality products.
          </p>
          <a className="btn download" href="#" download>
             Download CV
          </a>
        </section>

        {/* Posts Section */}
        <section className="section posts">
          <h3>Recent Posts</h3>
          <div className="cards">
            <article className="card post">
              <h4>Optimizing React Apps in 2025</h4>
              <p>Key strategies for performance, bundling, and UX in modern React stacks.</p>
            </article>
            <article className="card post">
              <h4>Design Systems: From Zero to One</h4>
              <p>How to set foundations, tokens, and components for scalable UI.</p>
            </article>
            <article className="card post">
              <h4>APIs and DX: Better Contracts</h4>
              <p>Approaches to API design that prioritize developer experience.</p>
            </article>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section experience">
          <h3>Experience</h3>
          <ul className="timeline">
            <li>
              <div className="title">Junior Frontend Engineer — Acme Corp</div>
              <div className="period">2022 – Present</div>
              <p>Lead UI initiatives, performance budgets, and accessibility standards.</p>
            </li>
            <li>
              <div className="title">Volunteer Frontend Developer — Beem Africa</div>
              <div className="period">2020 – 2022</div>
              <p>Built internal tooling and micro frontends with React and Vite.</p>
            </li>
          </ul>
        </section>

        {/* Education Section */}
        <section className="section education">
          <h3>Education</h3>
          <ul className="timeline">
            <li>
              <div className="title">Software Engineering — Moringa </div>
              <div className="period">May 2025 – November 2025</div>
            </li>
            <li>
              <div className="title">B.Sc. Computer Science — State University</div>
              <div className="period">2016 – 2020</div>
            </li>
          </ul>
        </section>

        {/* Skills Section */}
        <section className="section skills">
          <h3>Skills</h3>
          <ul className="chipset">
            <li>React</li>
            <li>Java Script</li>
            <li>Flask</li>
            <li>Python</li>
            <li>Design Systems</li>
            <li>Performance</li>
          </ul>
        </section>

        {/* Footer with Socials & Contact */}
        <footer className="site-footer">
          <div className="socials">
            <a href="#" aria-label="Twitter" className="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" aria-label="Email" className="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
          <div className="copyright">© {new Date().getFullYear()} WorkForce — All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
