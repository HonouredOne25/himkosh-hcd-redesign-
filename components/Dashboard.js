"use client";

import { useState } from "react";
import { showNotice } from "./notice";

const INITIAL_TRANSACTIONS = [
  {
    himgrn: "HP26-TR-849102",
    service: "Traffic E-Challan & Road Safety",
    ref: "HP 01 A 1234",
    amount: "₹1,000",
    date: "24 Sep 2026",
    status: "Paid",
  },
  {
    himgrn: "HP26-EX-401928",
    service: "Excise Duty & Retail Vend Fee",
    ref: "EXC-HP-2026-8812",
    amount: "₹5,000",
    date: "25 Sep 2026",
    status: "Pending",
  },
  {
    himgrn: "HP26-TR-184920",
    service: "Vehicle Fitness, Permit & Tax",
    ref: "HP 63 B 9918",
    amount: "₹1,500",
    date: "22 Sep 2026",
    status: "Paid",
  },
  {
    himgrn: "HP26-PL-192837",
    service: "Motor Vehicle Penalty (Speeding)",
    ref: "HP 01 A 1234",
    amount: "₹1,500",
    date: "23 Sep 2026",
    status: "Failed",
  },
];

export default function Dashboard({ user, onSelectHIMGRN }) {
  const [filter, setFilter] = useState("all");
  const [txns, setTxns] = useState(INITIAL_TRANSACTIONS);
  const [quickVerifyInput, setQuickVerifyInput] = useState("");

  const filteredTxns = txns.filter((t) => {
    if (filter === "paid") return t.status === "Paid";
    if (filter === "pending") return t.status === "Pending";
    if (filter === "failed") return t.status === "Failed";
    return true;
  });

  const handleAction = (txn) => {
    if (txn.status === "Paid") {
      if (onSelectHIMGRN) onSelectHIMGRN(txn.himgrn);
      const rSec = document.querySelector("#receipts");
      if (rSec) rSec.scrollIntoView({ behavior: "smooth" });
      showNotice(`Loading receipt for ${txn.himgrn}`);
    } else {
      const pSec = document.querySelector("#pay");
      if (pSec) pSec.scrollIntoView({ behavior: "smooth" });
      showNotice(`Resuming payment flow for ${txn.service}`);
    }
  };

  const handleQuickVerify = () => {
    if (!quickVerifyInput.trim()) {
      showNotice("Please enter a HIMGRN number");
      return;
    }
    if (onSelectHIMGRN) onSelectHIMGRN(quickVerifyInput.trim().toUpperCase());
    const vSec = document.querySelector("#verify");
    if (vSec) vSec.scrollIntoView({ behavior: "smooth" });
    showNotice(`Verifying ${quickVerifyInput}`);
  };

  return (
    <section className="section-wrap alt-bg" id="dashboard">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Returning Citizen Portal</p>
            <h2 className="section-title">Citizen Dashboard</h2>
            <p className="section-lead">
              Track your simulated challans, completed payments, and tax receipts in one consolidated overview.
            </p>
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Profile: <strong>{user?.name || "Priya Sharma"}</strong> · {user?.district || "Shimla, HP"}
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="dashboard-stats-grid">
          <div className="dash-stat-box">
            <small>Challans Cleared</small>
            <b>2</b>
            <div style={{ fontSize: "12px", color: "var(--success)", marginTop: "4px" }}>
              Settled in demo
            </div>
          </div>
          <div className="dash-stat-box">
            <small>Pending Reconciliation</small>
            <b style={{ color: "var(--warning)" }}>1</b>
            <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "4px" }}>
              Awaiting treasury clearance
            </div>
          </div>
          <div className="dash-stat-box">
            <small>Stored Receipts</small>
            <b>3</b>
            <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "4px" }}>
              Available for download
            </div>
          </div>
          <div className="dash-stat-box">
            <small>Primary Registered Vehicle</small>
            <b style={{ fontSize: "18px", color: "var(--primary)" }}>HP 01 A 1234</b>
            <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "4px" }}>
              Shimla Urban RTO
            </div>
          </div>
        </div>

        {/* Quick Verify Bar */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            padding: "20px 24px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--primary)", display: "block" }}>
              Quick HIMGRN Lookup
            </span>
            <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
              Have a physical challan slip? Jump directly to verification status.
            </small>
          </div>
          <div style={{ display: "flex", gap: "8px", flex: "1", maxWidth: "420px" }}>
            <input
              type="text"
              className="form-input"
              style={{ height: "42px", fontSize: "13px" }}
              placeholder="Enter HIMGRN (e.g. HP26-TR-849102)"
              value={quickVerifyInput}
              onChange={(e) => setQuickVerifyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuickVerify()}
            />
            <button className="btn-primary" style={{ padding: "0 18px", height: "42px", fontSize: "13px" }} onClick={handleQuickVerify}>
              Lookup
            </button>
          </div>
        </div>

        {/* Filter Tabs & Transactions Table */}
        <div className="dashboard-card">
          <div
            style={{
              padding: "16px 24px",
              background: "#f7faf8",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                { id: "all", label: "All Transactions" },
                { id: "paid", label: "Paid" },
                { id: "pending", label: "Pending" },
                { id: "failed", label: "Failed" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    background: filter === tab.id ? "var(--primary)" : "transparent",
                    color: filter === tab.id ? "#ffffff" : "var(--text-muted)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              Showing {filteredTxns.length} records · Simulated Database
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>HIMGRN / Reference</th>
                  <th>Service Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((row) => (
                  <tr key={row.himgrn}>
                    <td>
                      <b style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--primary)" }}>
                        {row.himgrn}
                      </b>
                      <small style={{ display: "block", color: "var(--text-dim)", fontSize: "11px" }}>
                        Ref: {row.ref}
                      </small>
                    </td>
                    <td>
                      <div style={{ fontWeight: "600" }}>{row.service}</div>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{row.date}</td>
                    <td>
                      <strong style={{ color: "var(--text-main)" }}>{row.amount}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="sample-btn"
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                        onClick={() => handleAction(row)}
                      >
                        {row.status === "Paid" ? "View Receipt →" : "Resolve →"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
