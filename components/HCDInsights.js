"use client";

export default function HCDInsights() {
  const principles = [
    {
      num: "01",
      title: "Goal-First Over Department Silos",
      problem: "Traditional portals require users to know bureaucratic structures (e.g. Major Head 0041, DDO Shimla) before starting.",
      solution: "In this redesign, citizens choose their goal (e.g. 'Pay Traffic Challan') and the system automatically maps the correct treasury accounting head in the background.",
    },
    {
      num: "02",
      title: "Progressive Disclosure vs. Cognitive Overload",
      problem: "Standard government forms present 20+ fields at once, including obscure treasury codes and bank clearing codes.",
      solution: "A 5-step flow reveals information only as it becomes relevant, keeping the initial screen calm and non-intimidating.",
    },
    {
      num: "03",
      title: "Plain Language vs. Bureaucratic Jargon",
      problem: "Cryptic terms like HIMGRN, Cyber Treasury DDO, Challan Defaulter, and Reconciliation Codes cause anxiety.",
      solution: "Every term is decoded into plain English or Hindi with tooltips, and the conversational AI Guide translates citizen queries into actions.",
    },
    {
      num: "04",
      title: "Guest-First Checkout vs. Forced Sign-Up",
      problem: "Forcing citizens to register an account with OTPs and passwords just to pay a one-time road tax or minor penalty.",
      solution: "Guest checkout allows immediate payment by vehicle number, reserving account sign-in only for returning citizens wanting history.",
    },
    {
      num: "05",
      title: "Actionable Feedback vs. Opaque Error Messages",
      problem: "Error screens showing 'Database Connection Timeout' or 'Transaction 503' leave citizens terrified about double-debiting.",
      solution: "Explicit status badges (Paid, Pending, Failed, Expired) with plain-language next steps and automatic duplicate-debit safety instructions.",
    },
    {
      num: "06",
      title: "Accessible Public Service Visual Identity",
      problem: "Cluttered government pages with flashing banners, unreadable fonts, and poor mobile layout.",
      solution: "High-contrast palette (Deep Forest Green, warm paper off-white), WCAG AA compliance, and responsive touch controls for mobile screens.",
    },
  ];

  return (
    <section className="section-wrap alt-bg" id="hcd">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Academic Research & Methodology</p>
            <h2 className="section-title">Human-Centered Design (HCD) Evidence</h2>
            <p className="section-lead">
              How this concept redesign directly addresses systemic usability barriers documented in Indian civic e-governance systems.
            </p>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-dim)", textAlign: "right" }}>
            <span>HCD Framework</span>
            <div style={{ fontWeight: "700", color: "var(--primary)" }}>Citizen-Centric Public Service</div>
          </div>
        </div>

        <div className="hcd-grid">
          {principles.map((p) => (
            <div key={p.num} className="hcd-card">
              <span className="hcd-num">PRINCIPLE {p.num}</span>
              <h4>{p.title}</h4>
              <div className="hcd-problem">
                <strong>Traditional Pain Point:</strong> {p.problem}
              </div>
              <div className="hcd-solution">
                <strong>HCD Solution:</strong> {p.solution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
