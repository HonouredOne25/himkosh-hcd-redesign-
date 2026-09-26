"use client";

import { useState } from "react";

export default function AcademicBanner() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="academic-banner" role="region" aria-label="Academic prototype notice">
        <span className="academic-badge">Academic Concept</span>
        <span className="academic-text">
          Independent UX/HCD redesign for academic research · Transactions are simulated and not connected to official government gateways
        </span>
        <button
          onClick={() => setShowInfo(true)}
          style={{
            textDecoration: "underline",
            color: "#8be0bc",
            fontSize: "11px",
            fontWeight: "700",
            cursor: "pointer",
          }}
          aria-label="View academic project context"
        >
          Research Context
        </button>
      </div>

      {showInfo && (
        <div className="modal-backdrop" onClick={() => setShowInfo(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Academic Concept Redesign</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowInfo(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              <p style={{ marginBottom: "12px" }}>
                <strong>Project Purpose:</strong> This prototype demonstrates how <em>Human-Centered Design (HCD)</em> and <em>AI-assisted guidance</em> can simplify public service payments for citizens.
              </p>
              <p style={{ marginBottom: "12px" }}>
                <strong>Simulation Notice:</strong> This website does not process actual government revenue, bank transfers, or official challans for Himachal Pradesh. All transactions, HIMGRNs, and receipts generated here are strictly simulated.
              </p>
              <p style={{ marginBottom: "18px" }}>
                <strong>Key Improvements:</strong> Goal-first navigation, progressive disclosure forms, plain-language error explanations, and conversational civic AI guidance.
              </p>
              <button
                className="btn-primary"
                style={{ width: "100%" }}
                onClick={() => setShowInfo(false)}
              >
                Continue Exploring Prototype
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
