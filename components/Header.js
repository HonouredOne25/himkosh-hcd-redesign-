"use client";

import { useState } from "react";

export default function Header({ user, onOpenAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#home" className="brand-link" aria-label="HimKosh Concept Home">
          <div className="brand-icon" aria-hidden="true">₹</div>
          <div className="brand-meta">
            <b>HimKosh</b>
            <span>e-Challan · Concept Redesign</span>
          </div>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`} aria-label="Main Navigation">
          <a href="#pay" className="nav-link" onClick={closeMenu}>
            Make Payment
          </a>
          <a href="#verify" className="nav-link" onClick={closeMenu}>
            Verify Challan
          </a>
          <a href="#receipts" className="nav-link" onClick={closeMenu}>
            Find Receipt
          </a>
          <a href="#dashboard" className="nav-link" onClick={closeMenu}>
            Dashboard
          </a>
          <a href="#ai" className="nav-link" onClick={closeMenu}>
            AI Guide
          </a>
          <a href="#hcd" className="nav-link" onClick={closeMenu}>
            HCD Principles
          </a>
          <a href="#help" className="nav-link" onClick={closeMenu}>
            Help & FAQ
          </a>
        </nav>

        <div className="header-actions">
          {user ? (
            <button
              className="user-status-pill"
              onClick={onOpenAuth}
              title="Click to view citizen profile or sign out"
            >
              <span>👤</span>
              <span>{user.name}</span>
            </button>
          ) : (
            <button className="btn-signin" onClick={onOpenAuth}>
              Citizen Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
