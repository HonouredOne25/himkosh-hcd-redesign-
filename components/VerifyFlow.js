"use client";

import { useState } from "react";
import { showNotice } from "./notice";

const SAMPLE_DATABASE = {
  "HP26-TR-849102": {
    himgrn: "HP26-TR-849102",
    service: "Traffic E-Challan & Road Safety",
    department: "Transport / Traffic Police",
    payer: "Priya Sharma",
    ref: "HP 01 A 1234",
    amount: "1,000",
    date: "24 Sep 2026, 11:20 AM",
    status: "Paid",
    explanation: "Paid — Your payment has been recorded successfully in this demo. The challan is fully settled and no further action is required from you.",
    actionType: "receipt",
    actionLabel: "Download Official Receipt →",
  },
  "HP26-EX-401928": {
    himgrn: "HP26-EX-401928",
    service: "Excise Duty & Retail Vend Fee",
    department: "State Taxes & Excise",
    payer: "Vikram Negi",
    ref: "EXC-HP-2026-8812",
    amount: "5,000",
    date: "25 Sep 2026, 09:45 AM",
    status: "Pending",
    explanation: "Pending — Payment was initiated at the bank, but electronic reconciliation with the Himachal treasury is still underway. Please allow 15 minutes before attempting any duplicate payment.",
    actionType: "wait",
    actionLabel: "Re-check Status in 5 mins",
  },
  "HP26-PL-192837": {
    himgrn: "HP26-PL-192837",
    service: "Vehicle Fitness, Permit & Tax",
    department: "Directorate of Transport",
    payer: "Sunil Verma",
    ref: "HP 63 B 9918",
    amount: "1,500",
    date: "23 Sep 2026, 04:15 PM",
    status: "Failed",
    explanation: "Failed — The issuing bank rejected this transaction (Simulated Gateway Timeout / Insufficient funds). No funds were credited to the treasury. You can retry safely.",
    actionType: "retry",
    actionLabel: "Retry Challan Payment →",
  },
  "HP26-RV-552019": {
    himgrn: "HP26-RV-552019",
    service: "Land Revenue & Mutation Fee",
    department: "Revenue & Land Records",
    payer: "Rajesh Kumar",
    ref: "REV-SHM-2026-4018",
    amount: "250",
    date: "10 Aug 2026, 02:00 PM",
    status: "Expired",
    explanation: "Expired — The validity window for this provisional challan has elapsed (government validity is 15 calendar days). Please generate a fresh challan.",
    actionType: "generate",
    actionLabel: "Generate New Challan →",
  },
};

export default function VerifyFlow({ activeHIMGRN, onSelectReceipt }) {
  const [query, setQuery] = useState(activeHIMGRN || "");
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (searchId = query) => {
    const trimmed = (searchId || "").trim().toUpperCase();
    if (!trimmed) {
      showNotice("Please enter a valid HIMGRN or Challan number.");
      return;
    }

    setHasSearched(true);

    // Look up in sample database or check if it matches dynamic pattern
    if (SAMPLE_DATABASE[trimmed]) {
      setResult(SAMPLE_DATABASE[trimmed]);
      showNotice(`Status found: ${SAMPLE_DATABASE[trimmed].status}`);
    } else if (trimmed.startsWith("HP26-")) {
      // Dynamic simulated result for freshly generated demo challans
      setResult({
        himgrn: trimmed,
        service: "General Government e-Challan",
        department: "Directorate of Public Accounts",
        payer: "Simulated Citizen Payer",
        ref: "REG-DEMO-2026",
        amount: "1,000",
        date: "Just now (Simulated)",
        status: "Paid",
        explanation: "Paid — Your payment has been verified as received by the state treasury in this demo prototype.",
        actionType: "receipt",
        actionLabel: "View Receipt Details →",
      });
      showNotice("Simulated challan verified as Paid!");
    } else {
      setResult({
        himgrn: trimmed,
        status: "NotFound",
        explanation: `No challan record found for "${trimmed}". Please double-check your HIMGRN on the physical notice or receipt, or verify if the number was entered correctly.`,
        actionType: "help",
        actionLabel: "Ask AI Guide for Help →",
      });
    }
  };

  const loadSample = (sampleId) => {
    setQuery(sampleId);
    handleVerify(sampleId);
  };

  const handleAction = (res) => {
    if (res.actionType === "receipt") {
      if (onSelectReceipt) onSelectReceipt(res.himgrn);
      const rSec = document.querySelector("#receipts");
      if (rSec) rSec.scrollIntoView({ behavior: "smooth" });
    } else if (res.actionType === "retry" || res.actionType === "generate") {
      const pSec = document.querySelector("#pay");
      if (pSec) pSec.scrollIntoView({ behavior: "smooth" });
    } else if (res.actionType === "help") {
      const aSec = document.querySelector("#ai");
      if (aSec) aSec.scrollIntoView({ behavior: "smooth" });
    } else {
      showNotice("Re-checking transaction reconciliation...");
      setTimeout(() => {
        showNotice("Bank reconciliation status still pending (simulated)");
      }, 600);
    }
  };

  return (
    <section className="section-wrap alt-bg" id="verify">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Primary Task 02</p>
            <h2 className="section-title">Verify a Challan</h2>
            <p className="section-lead">
              Check the live status of any payment or receipt in seconds without logging into multiple departmental portals.
            </p>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-dim)", textAlign: "right" }}>
            <span>HIMGRN Verification Engine</span>
            <div style={{ fontWeight: "700", color: "var(--primary)" }}>Instant Plain-Language Feedback</div>
          </div>
        </div>

        <div className="verification-box">
          <label className="form-label" htmlFor="verify-input">
            Enter HIMGRN / Challan Number <span style={{ color: "var(--danger)" }}>*</span>
          </label>

          <div className="search-input-group">
            <input
              id="verify-input"
              className="form-input"
              placeholder="e.g. HP26-TR-849102"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              aria-label="Enter HIMGRN to verify status"
            />
            <button className="btn-primary" onClick={() => handleVerify()}>
              Check Status
            </button>
          </div>

          <div className="sample-queries">
            <span>Test Realistic Status Outcomes:</span>
            <button className="sample-btn" onClick={() => loadSample("HP26-TR-849102")}>
              HP26-TR-849102 (Paid)
            </button>
            <button className="sample-btn" onClick={() => loadSample("HP26-EX-401928")}>
              HP26-EX-401928 (Pending)
            </button>
            <button className="sample-btn" onClick={() => loadSample("HP26-PL-192837")}>
              HP26-PL-192837 (Failed)
            </button>
            <button className="sample-btn" onClick={() => loadSample("HP26-RV-552019")}>
              HP26-RV-552019 (Expired)
            </button>
          </div>

          {/* Verification Result Card */}
          {hasSearched && result && (
            <div className={`status-result-card status-${result.status.toLowerCase()}`}>
              <div className="status-card-header">
                <div>
                  <span style={{ fontSize: "12px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Verified Record
                  </span>
                  <h4 style={{ fontSize: "18px", color: "var(--primary)", marginTop: "2px", fontFamily: "var(--font-mono)" }}>
                    {result.himgrn}
                  </h4>
                </div>

                <span className={`status-badge ${result.status.toLowerCase()}`}>
                  {result.status}
                </span>
              </div>

              <div className="status-explanation">
                <strong>Plain-Language Explanation:</strong>
                <p style={{ marginTop: "4px" }}>{result.explanation}</p>
              </div>

              {result.status !== "NotFound" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "12px",
                    marginBottom: "20px",
                    fontSize: "13px",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--text-dim)", display: "block", fontSize: "11px" }}>SERVICE</span>
                    <strong>{result.service}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-dim)", display: "block", fontSize: "11px" }}>PAYER</span>
                    <strong>{result.payer}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-dim)", display: "block", fontSize: "11px" }}>AMOUNT</span>
                    <strong>₹{result.amount}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-dim)", display: "block", fontSize: "11px" }}>RECORDED ON</span>
                    <strong>{result.date}</strong>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <button className="btn-primary" onClick={() => handleAction(result)}>
                  {result.actionLabel}
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setQuery("");
                    setResult(null);
                    setHasSearched(false);
                  }}
                >
                  Clear & Search Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
