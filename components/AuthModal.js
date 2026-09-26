"use client";

import { useState } from "react";
import { showNotice } from "./notice";

export default function AuthModal({ isOpen, onClose, onUserChange, currentUser }) {
  const [tab, setTab] = useState("login"); // login | signup | forgot
  const [mobile, setMobile] = useState("9816098160");
  const [name, setName] = useState("Priya Sharma");
  const [district, setDistrict] = useState("Shimla, HP");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("123456");

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length < 10) {
      showNotice("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpSent(true);
    showNotice("Demo OTP sent: 123456");
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    if (otp !== "123456") {
      showNotice("For this prototype, enter demo OTP: 123456");
      return;
    }
    const citizen = {
      name: name || "Priya Sharma",
      mobile,
      district,
      isSimulated: true,
    };
    onUserChange(citizen);
    showNotice(`Welcome, ${citizen.name}!`);
    onClose();
  };

  const handleSignOut = () => {
    onUserChange(null);
    showNotice("Signed out from simulated session");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--accent)", textTransform: "uppercase" }}>
              Citizen Portal
            </span>
            <h3>{currentUser ? "Citizen Profile" : tab === "login" ? "Sign In" : tab === "signup" ? "Create Profile" : "Reset Access"}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        {currentUser ? (
          <div>
            <div
              style={{
                background: "var(--bg-muted)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--primary)" }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                Mobile: +91 {currentUser.mobile}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Location: {currentUser.district}
              </div>
              <div style={{ fontSize: "11px", color: "var(--accent)", marginTop: "6px", fontWeight: "600" }}>
                Simulated Citizen Session Active
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={handleSignOut}>
                Sign Out
              </button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Nav tabs */}
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px", marginBottom: "20px" }}>
              <button
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: tab === "login" ? "var(--primary)" : "var(--text-dim)",
                  borderBottom: tab === "login" ? "2px solid var(--primary)" : "none",
                  paddingBottom: "4px",
                }}
                onClick={() => {
                  setTab("login");
                  setOtpSent(false);
                }}
              >
                Sign In
              </button>
              <button
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: tab === "signup" ? "var(--primary)" : "var(--text-dim)",
                  borderBottom: tab === "signup" ? "2px solid var(--primary)" : "none",
                  paddingBottom: "4px",
                }}
                onClick={() => {
                  setTab("signup");
                  setOtpSent(false);
                }}
              >
                Register Citizen
              </button>
              <button
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: tab === "forgot" ? "var(--primary)" : "var(--text-dim)",
                  borderBottom: tab === "forgot" ? "2px solid var(--primary)" : "none",
                  paddingBottom: "4px",
                }}
                onClick={() => {
                  setTab("forgot");
                  setOtpSent(false);
                }}
              >
                Help
              </button>
            </div>

            {tab === "login" && (
              <form onSubmit={otpSent ? handleVerifyLogin : handleSendOtp}>
                <div className="form-group">
                  <label className="form-label" htmlFor="auth-mobile">
                    Mobile Number <span style={{ color: "var(--danger)" }}>*</span>
                  </label>
                  <input
                    id="auth-mobile"
                    type="tel"
                    className="form-input"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={otpSent}
                  />
                  <small className="form-hint">Used for SMS payment receipts and OTP verification.</small>
                </div>

                {otpSent && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-otp">
                      Enter 6-Digit OTP <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <input
                      id="auth-otp"
                      type="text"
                      className="form-input"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <small className="form-hint" style={{ color: "var(--accent)", fontWeight: "600" }}>
                      Demo OTP: 123456 (pre-filled for prototype test)
                    </small>
                  </div>
                )}

                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "12px" }}>
                  {otpSent ? "Verify & Sign In →" : "Send One-Time Password (OTP) →"}
                </button>
              </form>
            )}

            {tab === "signup" && (
              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">District Location</label>
                  <input
                    className="form-input"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Shimla, HP"
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                  Register Demo Citizen Account →
                </button>
              </form>
            )}

            {tab === "forgot" && (
              <div>
                <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                  For this academic prototype, registration is never mandatory. You can use <strong>Guest Checkout</strong> to pay any challan or verify receipts instantly without signing in.
                </p>
                <button className="btn-primary" style={{ width: "100%" }} onClick={onClose}>
                  Continue as Guest Citizen
                </button>
              </div>
            )}

            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                background: "var(--bg-muted)",
                borderRadius: "var(--radius-md)",
                fontSize: "11px",
                color: "var(--text-dim)",
                textAlign: "center",
              }}
            >
              Academic Concept Prototype · No real phone calls or SMS messages are sent.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
