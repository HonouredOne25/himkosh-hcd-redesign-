"use client";

import { useState } from "react";
import { showNotice } from "./notice";

const SAMPLE_RECEIPTS = [
  {
    himgrn: "HP26-TR-849102",
    txnId: "TXN-DEMO-993814",
    service: "Traffic E-Challan & Road Safety",
    department: "Transport / Traffic Police",
    accountHead: "0041-00-102-01 (Taxes on Vehicles)",
    refNumber: "HP 01 A 1234",
    payerName: "Priya Sharma",
    mobile: "9816098160",
    district: "Shimla RTO",
    amount: "1,000.00",
    amountInWords: "One Thousand Rupees Only",
    paymentMode: "UPI / PhonePe (Simulated)",
    date: "24 Sep 2026, 11:20 AM",
    status: "PAID",
  },
  {
    himgrn: "HP26-EX-401928",
    txnId: "TXN-DEMO-551029",
    service: "Excise Duty & Retail Vend Fee",
    department: "State Taxes & Excise",
    accountHead: "0039-00-102-00 (State Excise Duties)",
    refNumber: "EXC-HP-2026-8812",
    payerName: "Vikram Negi",
    mobile: "9418094180",
    district: "Solan District Treasury",
    amount: "5,000.00",
    amountInWords: "Five Thousand Rupees Only",
    paymentMode: "Net Banking / SBI (Simulated)",
    date: "25 Sep 2026, 09:45 AM",
    status: "PENDING VERIFICATION",
  },
  {
    himgrn: "HP26-TR-184920",
    txnId: "TXN-DEMO-882190",
    service: "Vehicle Fitness, Permit & Tax",
    department: "Directorate of Transport",
    accountHead: "0041-00-800-02 (Other Vehicle Receipts)",
    refNumber: "HP 63 B 9918",
    payerName: "Sunil Verma",
    mobile: "9817098170",
    district: "Mandi RTO",
    amount: "1,500.00",
    amountInWords: "One Thousand Five Hundred Rupees Only",
    paymentMode: "Debit Card / RuPay (Simulated)",
    date: "22 Sep 2026, 03:15 PM",
    status: "PAID",
  },
];

export default function ReceiptSearch({ selectedHIMGRN }) {
  const [searchKey, setSearchKey] = useState(selectedHIMGRN || "HP26-TR-849102");
  const [receipt, setReceipt] = useState(SAMPLE_RECEIPTS[0]);
  const [searched, setSearched] = useState(true);

  const handleSearch = (keyToSearch = searchKey) => {
    const k = (keyToSearch || "").trim().toUpperCase();
    if (!k) {
      showNotice("Please enter a HIMGRN or Transaction ID.");
      return;
    }

    setSearched(true);
    const found = SAMPLE_RECEIPTS.find(
      (r) => r.himgrn.toUpperCase() === k || r.txnId.toUpperCase() === k || r.refNumber.toUpperCase() === k
    );

    if (found) {
      setReceipt(found);
      showNotice(`Receipt found for ${found.himgrn}`);
    } else if (k.startsWith("HP26-")) {
      // Dynamic simulated receipt for newly generated challans
      const dynamicReceipt = {
        himgrn: k,
        txnId: `TXN-DEMO-${Math.floor(10000000 + Math.random() * 90000000)}`,
        service: "Public Service e-Challan",
        department: "Himachal Pradesh State Treasury",
        accountHead: "0070-60-800 (Civic Administration Receipts)",
        refNumber: "DEMO-CHALLAN-REF",
        payerName: "Citizen Payer",
        mobile: "98XXXXXXXX",
        district: "Shimla State Treasury",
        amount: "1,000.00",
        amountInWords: "One Thousand Rupees Only",
        paymentMode: "UPI Instant (Simulated)",
        date: "Today (Simulated)",
        status: "PAID",
      };
      setReceipt(dynamicReceipt);
      showNotice("Simulated receipt generated!");
    } else {
      setReceipt(null);
      showNotice("No receipt found with that reference.");
    }
  };

  const handleDownload = () => {
    if (!receipt) return;
    const content = `===============================================================
       GOVERNMENT OF HIMACHAL PRADESH (CONCEPT REDESIGN)
                 e-CHALLAN CITIZEN RECEIPT
        [Academic Concept Prototype · Simulated Transaction]
===============================================================
HIMGRN:              ${receipt.himgrn}
TRANSACTION ID:      ${receipt.txnId}
DATE & TIME:         ${receipt.date}
TRANSACTION STATUS:  ${receipt.status}
===============================================================
PAYER INFORMATION:
Payer Name:          ${receipt.payerName}
Contact Mobile:      ${receipt.mobile}
District / Location: ${receipt.district}
Reference Number:    ${receipt.refNumber}
---------------------------------------------------------------
SERVICE & TREASURY PARTICULARS:
Service Name:        ${receipt.service}
Department:          ${receipt.department}
Treasury Head:       ${receipt.accountHead}
Payment Method:      ${receipt.paymentMode}
---------------------------------------------------------------
AMOUNT PARTICULARS:
Government Fee:      INR ${receipt.amount}
Convenience Charge:  INR 0.00
TOTAL PAID:          INR ${receipt.amount}
Amount in Words:     ${receipt.amountInWords}
===============================================================
DISCLAIMER:
This document is a simulated receipt produced as part of an
independent academic Human-Centered Design (HCD) research study.
It does not represent legal state treasury revenue collection.
===============================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${receipt.himgrn}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotice(`Downloaded Receipt_${receipt.himgrn}.txt`);
  };

  return (
    <section className="section-wrap" id="receipts">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Primary Task 03</p>
            <h2 className="section-title">Find a Receipt</h2>
            <p className="section-lead">
              Retrieve and print your simulated proof of payment using your HIMGRN or transaction reference.
            </p>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-dim)", textAlign: "right" }}>
            <span>Digital Receipts</span>
            <div style={{ fontWeight: "700", color: "var(--accent)" }}>Instant Local Download</div>
          </div>
        </div>

        <div className="verification-box">
          <label className="form-label" htmlFor="receipt-search-input">
            Search by HIMGRN, Transaction ID, or Reference Number
          </label>
          <div className="search-input-group">
            <input
              id="receipt-search-input"
              className="form-input"
              placeholder="e.g. HP26-TR-849102 or TXN-DEMO-993814"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              aria-label="Search receipt by HIMGRN"
            />
            <button className="btn-primary" onClick={() => handleSearch()}>
              Search Receipt
            </button>
          </div>

          <div className="sample-queries">
            <span>Quick Samples:</span>
            {SAMPLE_RECEIPTS.map((sr) => (
              <button
                key={sr.himgrn}
                className="sample-btn"
                onClick={() => {
                  setSearchKey(sr.himgrn);
                  handleSearch(sr.himgrn);
                }}
              >
                {sr.himgrn} ({sr.payerName})
              </button>
            ))}
          </div>

          {/* Receipt Preview Card */}
          {searched && receipt ? (
            <div className="receipt-card">
              <div className="receipt-watermark">ACADEMIC PROTOTYPE</div>

              <div className="receipt-top">
                <div className="receipt-title">
                  <b>Himachal Pradesh Public Treasury (Concept)</b>
                  <small>Department of Finance · Cyber Treasury Network</small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`status-badge ${receipt.status.includes("PAID") ? "paid" : "pending"}`}>
                    {receipt.status}
                  </span>
                  <div style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" }}>
                    Simulated Receipt
                  </div>
                </div>
              </div>

              <div className="receipt-grid">
                <div className="receipt-field">
                  <small>HIMGRN NUMBER</small>
                  <b style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>
                    {receipt.himgrn}
                  </b>
                </div>
                <div className="receipt-field">
                  <small>TRANSACTION ID</small>
                  <b style={{ fontFamily: "var(--font-mono)" }}>{receipt.txnId}</b>
                </div>
                <div className="receipt-field">
                  <small>PAYER NAME</small>
                  <b>{receipt.payerName}</b>
                </div>
                <div className="receipt-field">
                  <small>MOBILE NUMBER</small>
                  <b>+91 {receipt.mobile}</b>
                </div>
                <div className="receipt-field">
                  <small>SERVICE DESCRIPTION</small>
                  <b>{receipt.service}</b>
                </div>
                <div className="receipt-field">
                  <small>DEPARTMENT</small>
                  <b>{receipt.department}</b>
                </div>
                <div className="receipt-field">
                  <small>TREASURY HEAD</small>
                  <b style={{ fontSize: "12px", fontFamily: "var(--font-mono)" }}>
                    {receipt.accountHead}
                  </b>
                </div>
                <div className="receipt-field">
                  <small>REFERENCE / VEHICLE NO</small>
                  <b>{receipt.refNumber}</b>
                </div>
                <div className="receipt-field">
                  <small>DISTRICT / TREASURY</small>
                  <b>{receipt.district}</b>
                </div>
                <div className="receipt-field">
                  <small>PAYMENT MODE</small>
                  <b>{receipt.paymentMode}</b>
                </div>
              </div>

              <div
                style={{
                  background: "#f7faf8",
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "16px 0",
                }}
              >
                <div>
                  <small style={{ color: "var(--text-dim)", display: "block", fontSize: "11px" }}>
                    AMOUNT PAID
                  </small>
                  <b style={{ fontSize: "20px", color: "var(--primary)" }}>₹{receipt.amount}</b>
                  <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
                    ({receipt.amountInWords})
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: "12px", color: "var(--text-muted)" }}>
                  <div>Date: {receipt.date}</div>
                  <div style={{ color: "var(--accent)", fontWeight: "600" }}>Govt Charges: ₹0.00</div>
                </div>
              </div>

              <div className="receipt-footer">
                <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>
                  Electronic confirmation · Valid for audit & departmental presentation in this concept
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn-primary" onClick={handleDownload}>
                    ⬇ Download Receipt (.txt)
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      navigator.clipboard?.writeText(receipt.himgrn);
                      showNotice(`Copied HIMGRN: ${receipt.himgrn}`);
                    }}
                  >
                    Copy HIMGRN
                  </button>
                </div>
              </div>
            </div>
          ) : (
            searched && (
              <div
                style={{
                  textAlign: "center",
                  padding: "36px",
                  color: "var(--text-muted)",
                }}
              >
                <p>No receipt matched that search reference.</p>
                <small>Try one of the sample HIMGRNs above to preview a receipt.</small>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
