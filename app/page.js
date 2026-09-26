import Header from "../components/Header";
import TaskCards from "../components/TaskCards";
import Verify from "../components/Verify";
import AIGuide from "../components/AIGuide";
import FAQ from "../components/FAQ";
import PaymentFlow from "../components/PaymentFlow";

export default function Home() {
  return (
    <>
      <div className="demoBar"><b>CONCEPT REDESIGN</b><span>Academic prototype · Not connected to government payment systems</span></div>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="heroCopy">
            <p className="eyebrow">Government receipts, made simpler</p>
            <h1>Pay government fees without the <em>guesswork.</em></h1>
            <p className="lead">Create a challan, verify a receipt, or find a service through a clearer, task-first experience designed around citizens.</p>
            <div className="actions">
              <a className="primary" href="#tasks">Start a payment <span>→</span></a>
              <a className="secondary" href="#verify">Verify a challan</a>
            </div>
            <div className="trust"><span>✓ Clear steps</span><span>✓ Mobile friendly</span><span>✓ Accessible by design</span></div>
          </div>
          <PaymentFlow />
        </section>

        <section className="section" id="tasks">
          <div className="sectionHead"><div><p className="eyebrow">Start with your goal</p><h2>What do you want to do?</h2></div><p>Users shouldn't have to understand government departments before they can complete a simple task.</p></div>
          <TaskCards />
        </section>

        <section className="darkSection">
          <div className="journeyText">
            <p className="eyebrow mint">Human-centered flow</p>
            <h2>Always know where you are — and what happens next.</h2>
            <p>Progressive disclosure keeps the first screen simple. Required information appears only when it becomes relevant, while plain-language help reduces uncertainty.</p>
            <div className="features">
              <div><b>01</b><span><strong>Choose your task</strong><small>Start from your goal instead of a department.</small></span></div>
              <div><b>02</b><span><strong>Enter only what matters</strong><small>See the minimum fields needed for your task.</small></span></div>
              <div><b>03</b><span><strong>Review before payment</strong><small>Confirm details before the final action.</small></span></div>
            </div>
          </div>
          <div className="journeyCard">
            <div className="journeyTop"><b>Your payment journey</b><span>Step 1 of 3</span></div>
            <div className="journeyItem done"><i>✓</i><span><b>Choose service</b><small>Transport · Vehicle fee</small></span></div>
            <div className="journeyItem active"><i>2</i><span><b>Enter details</b><small>Guided information entry</small></span></div>
            <div className="journeyItem"><i>3</i><span><b>Review & pay</b><small>Confirm before continuing</small></span></div>
          </div>
        </section>

        <Verify />

        <section className="section aiSection" id="ai">
          <AIGuide />
        </section>

        <section className="section history">
          <div className="sectionHead"><div><p className="eyebrow">Transaction history</p><h2>Your receipts, all in one place.</h2></div><button className="secondary" onClick={() => alert("Demo sign-in — no real account is created.")}>Sign in</button></div>
          <div className="historyCard">
            <div className="historyRow head"><span>Transaction</span><span>Date</span><span>Amount</span><span>Status</span></div>
            {[
              ["Vehicle service","24 Sep 2026","₹1,250","Paid"],
              ["Government fee","12 Sep 2026","₹500","Paid"],
              ["Challan","03 Sep 2026","₹850","Pending"]
            ].map((r,i)=><div className="historyRow" key={i}><span><b>{r[0]}</b><small>HIMGRN · HP26•••{184+i*371}</small></span><span>{r[1]}</span><span>{r[2]}</span><span className={r[3]==="Paid"?"status paid":"status pending"}>{r[3]}</span></div>)}
          </div>
        </section>

        <section className="section" id="help">
          <div className="sectionHead"><div><p className="eyebrow">Need a little clarity?</p><h2>Common questions</h2></div></div>
          <FAQ />
        </section>
      </main>
      <footer><div><b>₹ HimKosh e-Challan</b><small>Human-centered concept redesign</small></div><span>Prototype for academic UX/HCD study · Not an official government website.</span></footer>
    </>
  );
}
