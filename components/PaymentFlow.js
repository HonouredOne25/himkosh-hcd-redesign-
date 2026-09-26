"use client";

import { useState } from "react";
import { showNotice } from "./notice";

const SERVICES_DATA = [
  {
    id: "transport_traffic",
    name: "Traffic E-Challan & Road Safety",
    department: "Transport / Traffic Police",
    code: "0041-00-102",
    defaultAmount: 1000,
    refLabel: "Vehicle Number / Challan Ref",
    refPlaceholder: "e.g. HP 01 A 1234 or CH-2026-9042",
    refHelp: "Found on your vehicle registration certificate (RC) or traffic notification.",
  },
  {
    id: "transport_fitness",
    name: "Vehicle Fitness, Permit & Tax",
    department: "Directorate of Transport",
    code: "0041-00-800",
    defaultAmount: 1500,
    refLabel: "Registration / Chassis No.",
    refPlaceholder: "e.g. HP 63 B 9918",
    refHelp: "Enter your commercial or passenger vehicle registration number.",
  },
  {
    id: "revenue_mutation",
    name: "Land Revenue & Mutation Fee",
    department: "Revenue & Land Records",
    code: "0029-00-103",
    defaultAmount: 250,
    refLabel: "Khasra / Application Ref",
    refPlaceholder: "e.g. REV-SHM-2026-4018",
    refHelp: "Found on your revenue application or Tehsil receipt.",
  },
  {
    id: "excise_license",
    name: "Excise Duty & Retail Vend Fee",
    department: "State Taxes & Excise",
    code: "0039-00-102",
    defaultAmount: 5000,
    refLabel: "Excise License / Vend ID",
    refPlaceholder: "e.g. EXC-HP-2026-8812",
    refHelp: "Provided in your trade vend authorization letter.",
  },
  {
    id: "urban_tax",
    name: "Municipal Property Tax / Sanitation",
    department: "Urban Development / MC",
    code: "0070-60-800",
    defaultAmount: 800,
    refLabel: "Property Assessment Number",
    refPlaceholder: "e.g. SHM-MC-PROP-5421",
    refHelp: "Found on your municipal tax demand bill.",
  },
  {
    id: "forest_fee",
    name: "Forest Transit Pass & Royalty",
    department: "Forest & Wildlife",
    code: "0406-01-800",
    defaultAmount: 450,
    refLabel: "Transit Permit Reference",
    refPlaceholder: "e.g. FOR-KL-2026-092",
    refHelp: "Issued by the Divisional Forest Officer (DFO).",
  },
];

const DISTRICTS = [
  "Shimla",
  "Kangra (Dharamshala)",
  "Mandi",
  "Solan",
  "Kullu",
  "Sirmaur (Nahan)",
  "Una",
  "Hamirpur",
  "Bilaspur",
  "Chamba",
  "Kinnaur (Reckong Peo)",
  "Lahaul & Spiti (Keylong)",
];

export default function PaymentFlow({ onTransactionCreated }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]);
  const [serviceSearch, setServiceSearch] = useState("");

  // Form details
  const [formData, setFormData] = useState({
    refNumber: "",
    payerName: "Priya Sharma",
    mobile: "9816098160",
    district: "Shimla",
    amount: "1000",
    remarks: "Simulated fee payment",
  });

  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);

  // Filter services
  const filteredServices = SERVICES_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const handleServiceSelect = (svc) => {
    setSelectedService(svc);
    setFormData((prev) => ({
      ...prev,
      amount: String(svc.defaultAmount),
    }));
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.refNumber.trim()) {
      errs.refNumber = "Please enter the reference or registration number.";
    }
    if (!formData.payerName.trim()) {
      errs.payerName = "Payer full name is required.";
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      errs.mobile = "Please provide a valid 10-digit mobile number.";
    }
    const amtNum = parseFloat(formData.amount);
    if (!amtNum || isNaN(amtNum) || amtNum <= 0) {
      errs.amount = "Please enter a valid payment amount.";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const generatedHIMGRN = `HP26-TR-${randomSuffix}`;
      const generatedTxnId = `TXN-DEMO-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      const newTxn = {
        himgrn: generatedHIMGRN,
        txnId: generatedTxnId,
        service: selectedService.name,
        department: selectedService.department,
        accountCode: selectedService.code,
        refNumber: formData.refNumber.toUpperCase(),
        payerName: formData.payerName,
        mobile: formData.mobile,
        district: formData.district,
        amount: formData.amount,
        paymentMethod: paymentMethod.toUpperCase(),
        date: dateStr,
        status: "Paid",
        isDemo: true,
      };

      setCompletedTxn(newTxn);
      setIsProcessing(false);
      setStep(5);

      if (onTransactionCreated) {
        onTransactionCreated(newTxn);
      }
      showNotice(`Simulated challan created: ${generatedHIMGRN}`);
    }, 900);
  };

  const handleDownloadReceipt = () => {
    if (!completedTxn) return;
    const receiptContent = `=====================================================
HIMKOSH e-CHALLAN — CITIZEN PAYMENT RECEIPT
(Academic Concept Redesign · Simulated Receipt)
=====================================================
STATUS: RECORDED AS PAID (DEMO)
DATE & TIME: ${completedTxn.date}
HIMGRN: ${completedTxn.himgrn}
TRANSACTION ID: ${completedTxn.txnId}
-----------------------------------------------------
PAYER DETAILS:
Payer Name: ${completedTxn.payerName}
Mobile No.: ${completedTxn.mobile}
District/Treasury: ${completedTxn.district}
Reference No.: ${completedTxn.refNumber}
-----------------------------------------------------
SERVICE & HEAD OF ACCOUNT:
Service: ${completedTxn.service}
Department: ${completedTxn.department}
Treasury Head: ${completedTxn.accountCode}
Payment Mode: ${completedTxn.paymentMethod} (Simulated)
-----------------------------------------------------
TOTAL AMOUNT PAID: INR ${parseFloat(completedTxn.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
Amount in Words: INR ${completedTxn.amount} Rupees Only
=====================================================
NOTE: This is a simulated receipt for an academic Human-
Centered Design (HCD) research project. No real government
revenue was processed.
=====================================================`;

    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `HimKosh_Receipt_${completedTxn.himgrn}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotice("Demo receipt downloaded successfully!");
  };

  const handleStartAnother = () => {
    setCompletedTxn(null);
    setFormData({
      refNumber: "",
      payerName: "Priya Sharma",
      mobile: "9816098160",
      district: "Shimla",
      amount: String(selectedService.defaultAmount),
      remarks: "Simulated fee payment",
    });
    setFormErrors({});
    setStep(1);
  };

  return (
    <section className="section-wrap" id="pay">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Primary Task 01</p>
            <h2 className="section-title">Make a Payment</h2>
            <p className="section-lead">
              Create an e-Challan in minutes. Our human-centered flow eliminates technical treasury codes and guides you step-by-step.
            </p>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-dim)", textAlign: "right" }}>
            <span>🔒 Simulated Test Gateway</span>
            <div style={{ fontWeight: "700", color: "var(--accent)" }}>Zero Financial Risk</div>
          </div>
        </div>

        <div className="payment-workbench">
          {/* Stepper Navigation */}
          <div className="stepper-header">
            <div className="stepper-nav" role="tablist" aria-label="Payment steps">
              {[
                { n: 1, label: "Select Service" },
                { n: 2, label: "Enter Details" },
                { n: 3, label: "Review & Confirm" },
                { n: 4, label: "Simulate Payment" },
                { n: 5, label: "Receipt" },
              ].map((s) => (
                <div
                  key={s.n}
                  className={`step-pill ${step === s.n ? "active" : ""} ${step > s.n ? "completed" : ""}`}
                >
                  <span className="step-circle">{step > s.n ? "✓" : s.n}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-dim)" }}>
              Step {step} of 5
            </div>
          </div>

          <div className="flow-content">
            {/* STEP 1: SELECT SERVICE */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "8px" }}>
                  Step 1: What would you like to pay for?
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Select a common public service preset below or search by service name.
                </p>

                <div className="form-group" style={{ maxWidth: "420px" }}>
                  <input
                    type="search"
                    className="form-input"
                    placeholder="Search services (e.g. traffic, fitness, land)..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    aria-label="Filter civic services"
                  />
                </div>

                <div className="service-presets-grid">
                  {filteredServices.map((svc) => (
                    <button
                      key={svc.id}
                      type="button"
                      className={`service-card-btn ${selectedService.id === svc.id ? "selected" : ""}`}
                      onClick={() => handleServiceSelect(svc)}
                    >
                      <span className="service-btn-name">{svc.name}</span>
                      <span className="service-btn-dept">{svc.department}</span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent)", marginTop: "4px" }}>
                        Typical Fee: ₹{svc.defaultAmount}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flow-actions">
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    Selected: <strong>{selectedService.name}</strong> ({selectedService.department})
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => setStep(2)}
                  >
                    Continue to Details →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ENTER DETAILS */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "8px" }}>
                  Step 2: Enter Challan Details
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "24px" }}>
                  Fill only the fields required for {selectedService.name}.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="refNumber">
                    {selectedService.refLabel} <span className="req">*</span>
                  </label>
                  <input
                    id="refNumber"
                    className="form-input"
                    placeholder={selectedService.refPlaceholder}
                    value={formData.refNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, refNumber: e.target.value });
                      if (formErrors.refNumber) setFormErrors({ ...formErrors, refNumber: null });
                    }}
                  />
                  <small className="form-hint">{selectedService.refHelp}</small>
                  {formErrors.refNumber && <span className="form-error">{formErrors.refNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="payerName">
                      Payer Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="payerName"
                      className="form-input"
                      placeholder="e.g. Priya Sharma"
                      value={formData.payerName}
                      onChange={(e) => {
                        setFormData({ ...formData, payerName: e.target.value });
                        if (formErrors.payerName) setFormErrors({ ...formErrors, payerName: null });
                      }}
                    />
                    {formErrors.payerName && <span className="form-error">{formErrors.payerName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="mobile">
                      Mobile Number (for SMS confirmation) <span className="req">*</span>
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      className="form-input"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({ ...formData, mobile: e.target.value });
                        if (formErrors.mobile) setFormErrors({ ...formErrors, mobile: null });
                      }}
                    />
                    {formErrors.mobile && <span className="form-error">{formErrors.mobile}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="district">
                      District / Treasury Location <span className="req">*</span>
                    </label>
                    <select
                      id="district"
                      className="form-select"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="amount">
                      Payment Amount (INR) <span className="req">*</span>
                    </label>
                    <input
                      id="amount"
                      type="number"
                      className="form-input"
                      placeholder="₹ Amount"
                      value={formData.amount}
                      onChange={(e) => {
                        setFormData({ ...formData, amount: e.target.value });
                        if (formErrors.amount) setFormErrors({ ...formErrors, amount: null });
                      }}
                    />
                    {formErrors.amount && <span className="form-error">{formErrors.amount}</span>}
                  </div>
                </div>

                <div className="flow-actions">
                  <button className="btn-secondary" onClick={() => setStep(1)}>
                    ← Back to Services
                  </button>
                  <button className="btn-primary" onClick={handleProceedToReview}>
                    Review Information →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & SUMMARY */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "8px" }}>
                  Step 3: Review Challan Summary
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "24px" }}>
                  Please verify all transaction details. No real bank debit will take place in this academic prototype.
                </p>

                <div className="review-panel">
                  <div className="review-row">
                    <span className="review-label">Service Name</span>
                    <span className="review-value">{selectedService.name}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Department</span>
                    <span className="review-value">{selectedService.department}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Treasury Head of Account</span>
                    <span className="review-value" style={{ fontFamily: "var(--font-mono)" }}>
                      {selectedService.code}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Reference / Reg No.</span>
                    <span className="review-value" style={{ textTransform: "uppercase" }}>
                      {formData.refNumber}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Payer Name</span>
                    <span className="review-value">{formData.payerName}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Notification Mobile</span>
                    <span className="review-value">+91 {formData.mobile}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">District / RTO Location</span>
                    <span className="review-value">{formData.district}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Convenience Fee</span>
                    <span className="review-value" style={{ color: "var(--accent)" }}>
                      ₹0.00 (Public Service Waiver)
                    </span>
                  </div>
                  <div className="review-row total-row">
                    <span className="review-label">Total Payable</span>
                    <span className="review-value">
                      ₹{parseFloat(formData.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="flow-actions">
                  <button className="btn-secondary" onClick={() => setStep(2)}>
                    ← Edit Details
                  </button>
                  <button className="btn-primary" onClick={() => setStep(4)}>
                    Generate Simulated Challan →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SIMULATE PAYMENT */}
            {step === 4 && (
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--primary)", marginBottom: "8px" }}>
                  Step 4: Select Simulated Payment Route
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Choose your test payment gateway route. This generates a simulated state treasury receipt.
                </p>

                <div className="payment-methods-grid">
                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === "upi" ? "selected" : ""}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <b>📱 UPI Instant (Simulated)</b>
                    <small>Google Pay, PhonePe, Paytm, BHIM</small>
                  </button>

                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === "netbanking" ? "selected" : ""}`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <b>🏛️ Net Banking (Simulated)</b>
                    <small>SBI, PNB, HDFC, ICICI, HP State Co-op</small>
                  </button>

                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === "card" ? "selected" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <b>💳 Debit / Rupay Card (Simulated)</b>
                    <small>Instant simulated authorization</small>
                  </button>
                </div>

                <div
                  style={{
                    background: "#f0f8f4",
                    border: "1px solid var(--accent)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px 20px",
                    marginBottom: "24px",
                    fontSize: "13px",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>ℹ️</span>
                  <div>
                    <strong>Academic Sandbox Mode:</strong> Clicking "Complete Simulated Payment" will record a realistic test challan with a generated HIMGRN and allow you to test receipt downloads and verification.
                  </div>
                </div>

                <div className="flow-actions">
                  <button className="btn-secondary" onClick={() => setStep(3)}>
                    ← Back to Review
                  </button>
                  <button
                    className="btn-primary"
                    disabled={isProcessing}
                    onClick={handleSimulatePayment}
                  >
                    {isProcessing ? "Authorizing Simulated Payment..." : `Pay ₹${formData.amount} (Simulated) →`}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMATION & RECEIPT */}
            {step === 5 && completedTxn && (
              <div className="confirmation-card">
                <div className="success-badge-icon">✓</div>
                <p className="kicker" style={{ justifyContent: "center" }}>
                  Transaction Completed · Academic Simulation
                </p>
                <h3>Challan Paid Successfully</h3>
                <p>
                  Your simulated civic transaction has been recorded. Keep the HIMGRN below for any future verification.
                </p>

                <div className="review-panel" style={{ textAlign: "left", margin: "24px 0" }}>
                  <div className="review-row">
                    <span className="review-label">HIMGRN Number</span>
                    <span className="review-value" style={{ color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "15px" }}>
                      {completedTxn.himgrn}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Demo Transaction ID</span>
                    <span className="review-value" style={{ fontFamily: "var(--font-mono)" }}>
                      {completedTxn.txnId}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Service</span>
                    <span className="review-value">{completedTxn.service}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Amount Paid</span>
                    <span className="review-value" style={{ color: "var(--success)" }}>
                      ₹{completedTxn.amount} (Demo)
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Payment Date</span>
                    <span className="review-value">{completedTxn.date}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Status</span>
                    <span className="review-value" style={{ color: "var(--success)", fontWeight: "800" }}>
                      ● PAID (Simulated)
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={handleDownloadReceipt}>
                    ⬇ Download Official Receipt (.txt/PDF)
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const verifySec = document.querySelector("#verify");
                      if (verifySec) verifySec.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Verify this HIMGRN →
                  </button>
                  <button className="btn-secondary" onClick={handleStartAnother}>
                    Make Another Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
