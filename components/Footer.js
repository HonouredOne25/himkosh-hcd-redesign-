"use client";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <b>HimKosh e-Challan — Concept Redesign</b>
          <p>
            An independent Human-Centered Design (HCD) & AI-assisted public service research prototype. Reimagining civic transactions for clarity, accessibility, and trust.
          </p>
          <div style={{ marginTop: "14px", fontSize: "12px", color: "#6ea591" }}>
            Academic Prototype · Not affiliated with Government of Himachal Pradesh
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h5>Citizen Tasks</h5>
            <ul>
              <li><a href="#pay">Make a Payment</a></li>
              <li><a href="#verify">Verify a Challan</a></li>
              <li><a href="#receipts">Find a Receipt</a></li>
              <li><a href="#dashboard">Citizen Dashboard</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Design & AI</h5>
            <ul>
              <li><a href="#ai">HimKosh AI Guide</a></li>
              <li><a href="#hcd">HCD Principles</a></li>
              <li><a href="#help">Help & FAQ</a></li>
              <li><a href="#home">Back to Top</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Academic Context</h5>
            <ul>
              <li><span style={{ fontSize: "13px", color: "#92aea3" }}>UX / HCI Research Study</span></li>
              <li><span style={{ fontSize: "13px", color: "#92aea3" }}>Accessibility: WCAG AA</span></li>
              <li><span style={{ fontSize: "13px", color: "#92aea3" }}>Zero Real Financial Debits</span></li>
              <li><span style={{ fontSize: "13px", color: "#92aea3" }}>Simulated Gateway Mode</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          Independent Academic Concept © {new Date().getFullYear()} · Created for Human-Centered Design Presentation.
        </div>
        <div>
          All challans, HIMGRNs, and receipts generated on this website are simulated test artifacts.
        </div>
      </div>
    </footer>
  );
}
