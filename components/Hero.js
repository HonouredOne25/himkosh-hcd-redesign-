"use client";

export default function Hero({ onSelectTask }) {
  const tasks = [
    {
      id: "pay",
      icon: "₹",
      title: "Make a Payment",
      desc: "Generate an e-Challan for transport, excise, land revenue, or other civic services with minimum steps.",
      action: "Start Payment →",
      target: "#pay",
    },
    {
      id: "verify",
      icon: "✓",
      title: "Verify a Challan",
      desc: "Check whether a payment has been recorded with the treasury using your 14-character HIMGRN.",
      action: "Verify Status →",
      target: "#verify",
    },
    {
      id: "receipts",
      icon: "⌕",
      title: "Find a Receipt",
      desc: "Search and download official simulated payment receipts by HIMGRN or transaction reference.",
      action: "Search Receipts →",
      target: "#receipts",
    },
    {
      id: "help",
      icon: "✦",
      title: "Get AI Assistance",
      desc: "Ask our conversational guide to decode unfamiliar government terminology, departments, or fees.",
      action: "Ask AI Guide →",
      target: "#ai",
    },
  ];

  const steps = [
    {
      num: "01",
      label: "Choose Service",
      desc: "Select your civic task directly instead of navigating department hierarchies.",
    },
    {
      num: "02",
      label: "Enter Details",
      desc: "Fill only the essential fields needed for your specific challan.",
    },
    {
      num: "03",
      label: "Review",
      desc: "Confirm fee breakdown and payer details before any payment is initiated.",
    },
    {
      num: "04",
      label: "Simulate Payment",
      desc: "Test simulated UPI, Net Banking, or Card checkout with zero financial risk.",
    },
    {
      num: "05",
      label: "Get Receipt",
      desc: "Instantly obtain your generated HIMGRN and printable proof of payment.",
    },
  ];

  const handleTaskClick = (task) => {
    if (onSelectTask) onSelectTask(task.id);
    const elem = document.querySelector(task.target);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="kicker">
          <span>Himachal Pradesh Public Service Redesign</span>
        </div>

        <h1 className="hero-title">
          Government payments, <em>made simpler.</em>
        </h1>

        <p className="hero-subtitle">
          Manage challans, pay civic dues, verify transaction statuses, and download official receipts through an accessible, task-first interface built for citizens.
        </p>

        {/* 4 Primary Tasks */}
        <div className="primary-tasks-container">
          <div className="task-grid-label">What can I do here? — Primary Tasks</div>
          <div className="tasks-grid">
            {tasks.map((task) => (
              <button
                key={task.id}
                className="task-action-card"
                onClick={() => handleTaskClick(task)}
                aria-label={`Go to ${task.title}`}
              >
                <div className="task-card-icon" aria-hidden="true">{task.icon}</div>
                <h3>{task.title}</h3>
                <p>{task.desc}</p>
                <span className="task-card-action">{task.action}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5-Step Process Roadmap */}
        <div className="roadmap-container">
          <div className="roadmap-header">How it works — 5 Human-Centered Steps</div>
          <div className="roadmap-steps">
            {steps.map((st) => (
              <div key={st.num} className="roadmap-step">
                <span className="step-num">{st.num}</span>
                <span className="step-label">{st.label}</span>
                <span className="step-desc">{st.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
