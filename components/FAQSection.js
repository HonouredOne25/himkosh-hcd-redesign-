"use client";

import { useState } from "react";

const FAQ_DATA = [
  {
    category: "Payments",
    q: "Do I need to create an account to pay a challan?",
    a: "No. A core human-centered design principle of this redesign is guest-first access. Any citizen can pay a challan or fee immediately using their vehicle number or challan reference without mandatory sign-up.",
  },
  {
    category: "Payments",
    q: "Can I pay using UPI (Google Pay, PhonePe, Paytm, BHIM)?",
    a: "Yes. In this redesign concept, instant UPI QR and VPA payments are front-and-center alongside Net Banking and RuPay cards, with zero gateway surcharge for citizens.",
  },
  {
    category: "Terminology",
    q: "What is a HIMGRN and why is it important?",
    a: "HIMGRN stands for Himachal Pradesh Government Receipt Number. It is a 14-digit unique reference generated for every civic transaction. You need it to track your payment, download receipts, or resolve duplicate debits.",
  },
  {
    category: "Terminology",
    q: "What are DDO codes and Major Heads of Account?",
    a: "In traditional government portals, citizens are often asked to select internal accounting codes (like 0041 for Motor Vehicles or DDO treasury office codes). In this redesign, the system selects those codes behind the scenes based on your civic task.",
  },
  {
    category: "Challans",
    q: "How soon does a paid challan get cleared with the police or RTO?",
    a: "In real e-Challan systems, clearance occurs electronically within 15 to 30 minutes of bank authorization. In this academic prototype, confirmation is simulated instantly upon checkout.",
  },
  {
    category: "Challans",
    q: "What should I do if my challan status shows 'Expired'?",
    a: "Challans that remain unpaid past their validity window (usually 15 calendar days) expire to prevent stale treasury claims. You simply generate a fresh challan with updated details.",
  },
  {
    category: "Errors",
    q: "My money was debited from my bank, but the challan still shows 'Pending'?",
    a: "Do NOT make a second payment immediately. The banking switch can take up to 15 minutes to reconcile with the Cyber Treasury. Verify your HIMGRN in the 'Verify a Challan' section after 15 minutes. If it fails, banks initiate an automatic refund within 48 hours.",
  },
  {
    category: "Errors",
    q: "I entered the wrong vehicle or reference number. What happens?",
    a: "Before payment authorization, you can edit all details in Step 3 (Review). If a challan has already been paid under an incorrect reference number, you must contact the departmental treasury officer for reconciliation.",
  },
  {
    category: "Receipts",
    q: "Can I download or print a receipt at a later date?",
    a: "Yes. Simply go to 'Find a Receipt' and enter your HIMGRN or vehicle registration number. You can preview and download a receipt anytime without logging in.",
  },
  {
    category: "Account",
    q: "What is the benefit of signing in as a citizen?",
    a: "Signing in allows you to save vehicle registration numbers, view consolidated payment history across family vehicles, and receive SMS alerts for upcoming vehicle fitness renewals.",
  },
];

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ["All", "Payments", "Challans", "Receipts", "Account", "Errors", "Terminology"];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      !searchFilter.trim() ||
      item.q.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.a.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="section-wrap" id="help">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Primary Task 04</p>
            <h2 className="section-title">Help & Frequently Asked Questions</h2>
            <p className="section-lead">
              Plain-language answers to common questions regarding government payments, HIMGRN tracking, receipts, and error recovery.
            </p>
          </div>
          <div style={{ maxWidth: "320px", width: "100%" }}>
            <input
              type="search"
              className="form-input"
              placeholder="Search help topics..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              aria-label="Search help topics"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="faq-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`faq-tab-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <div key={faq.q} className="faq-item">
                <button
                  type="button"
                  className="faq-header"
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  aria-expanded={openIndex === idx}
                >
                  <span>{faq.q}</span>
                  <b>{openIndex === idx ? "−" : "+"}</b>
                </button>
                {openIndex === idx && (
                  <div className="faq-body">
                    <p>{faq.a}</p>
                    <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-dim)" }}>
                      Category: {faq.category} · Plain-Language Public Guide
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No answers matched "{searchFilter}". Ask our <strong>HimKosh AI Guide</strong> above for immediate assistance!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
