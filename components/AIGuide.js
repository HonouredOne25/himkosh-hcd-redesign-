"use client";

import { useState } from "react";
import { showNotice } from "./notice";

const SUGGESTED_QUESTIONS = [
  "I need to pay a vehicle challan.",
  "Where can I find my receipt?",
  "What does pending mean?",
  "I don't understand HIMGRN.",
  "I entered the wrong information.",
  "How do I verify my challan?",
];

export default function AIGuide({ onNavigateAction }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Namaste! I am your HimKosh Citizen Guide. I can help identify the right government service, decode unfamiliar terms like HIMGRN, or walk you through payment and receipt verification in plain language.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.reply,
            actionLabel: data.actionLabel,
            targetId: data.targetId,
            suggestedAction: data.suggestedAction,
          },
        ]);
      } else {
        throw new Error("Route responded with non-200");
      }
    } catch (err) {
      console.warn("AI guide request failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I can help you navigate this civic portal. For payments, try the 'Make a Payment' tab above. To verify a receipt, enter your 14-character HIMGRN under 'Verify a Challan'.",
          actionLabel: "Go to Payment Flow →",
          targetId: "payment-section",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (targetId, action) => {
    if (onNavigateAction) onNavigateAction(action);
    const targetElement = document.getElementById(targetId) || document.querySelector(`[id^='${action}']`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      showNotice(`Navigated to ${action.toUpperCase()}`);
    }
  };

  return (
    <section className="section-wrap" id="ai">
      <div className="section-container">
        <div className="section-header">
          <div>
            <p className="kicker">Human-Centered AI Guidance</p>
            <h2 className="section-title">Meet the HimKosh Guide</h2>
            <p className="section-lead">
              Instead of navigating complex government hierarchies, describe your goal in natural language. Our conversational guide explains terminology and points you directly to the right action.
            </p>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-dim)", textAlign: "right" }}>
            <span>Civic AI Assistant</span>
            <div style={{ fontWeight: "700", color: "var(--accent)" }}>Plain-Language Advice</div>
          </div>
        </div>

        <div className="ai-panel-container">
          {/* Left Intro & Prompt Chips */}
          <div className="ai-intro-content">
            <h3 style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "12px" }}>
              How can I help you today?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6" }}>
              Whether you are paying a traffic fine, wondering why a status says "Pending", or trying to locate your receipt, select a common question below or type your inquiry.
            </p>

            <div className="prompt-chips-label">Common Citizen Questions</div>
            <div className="prompt-chips">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className="chip-btn"
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                >
                  <span>{q}</span>
                  <span className="arr">→</span>
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                fontSize: "12.5px",
                color: "var(--text-muted)",
              }}
            >
              <strong>Academic Concept Safeguard:</strong> This AI assistant provides informational guidance only. It will never request sensitive bank PINs or claim to execute financial debits.
            </div>
          </div>

          {/* Right Chat Window */}
          <div className="chat-window">
            <div className="chat-header">
              <div className="ai-avatar">✦</div>
              <div>
                <b>HimKosh Citizen Guide</b>
                <small>● Ready to assist · Academic AI</small>
              </div>
            </div>

            <div className="chat-stream">
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-msg ${m.role}`}>
                  <p>{m.text}</p>
                  {m.actionLabel && m.targetId && (
                    <button
                      className="msg-action-btn"
                      onClick={() => handleActionClick(m.targetId, m.suggestedAction || "pay")}
                    >
                      {m.actionLabel}
                    </button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="chat-msg bot" style={{ fontStyle: "italic", color: "var(--text-dim)" }}>
                  Analyzing your civic request...
                </div>
              )}
            </div>

            <div className="chat-composer">
              <input
                type="text"
                placeholder="Ask about a fine, fee, receipt, or status..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
                aria-label="Ask the AI Guide a question"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputText.trim()}
                aria-label="Send inquiry"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
