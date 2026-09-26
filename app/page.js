"use client";

import { useState } from "react";
import AcademicBanner from "../components/AcademicBanner";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PaymentFlow from "../components/PaymentFlow";
import VerifyFlow from "../components/VerifyFlow";
import ReceiptSearch from "../components/ReceiptSearch";
import Dashboard from "../components/Dashboard";
import AIGuide from "../components/AIGuide";
import HCDInsights from "../components/HCDInsights";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [currentUser, setCurrentUser] = useState({
    name: "Priya Sharma",
    mobile: "9816098160",
    district: "Shimla, HP",
    isSimulated: true,
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedHIMGRN, setSelectedHIMGRN] = useState("HP26-TR-849102");

  const handleTransactionCreated = (newTxn) => {
    setSelectedHIMGRN(newTxn.himgrn);
  };

  const handleSelectReceipt = (himgrn) => {
    setSelectedHIMGRN(himgrn);
  };

  return (
    <>
      <AcademicBanner />
      <Header user={currentUser} onOpenAuth={() => setIsAuthOpen(true)} />

      <main id="main-content">
        <Hero onSelectTask={(taskId) => {}} />

        {/* Task 1: Make a Payment */}
        <PaymentFlow onTransactionCreated={handleTransactionCreated} />

        {/* Task 2: Verify a Challan */}
        <VerifyFlow
          activeHIMGRN={selectedHIMGRN}
          onSelectReceipt={handleSelectReceipt}
        />

        {/* Task 3: Find a Receipt */}
        <ReceiptSearch selectedHIMGRN={selectedHIMGRN} />

        {/* Returning Citizen Dashboard */}
        <Dashboard user={currentUser} onSelectHIMGRN={setSelectedHIMGRN} />

        {/* Task 4: AI Citizen Guide */}
        <AIGuide onNavigateAction={(action) => {}} />

        {/* HCD Research Evidence & Methodology */}
        <HCDInsights />

        {/* Categorized FAQ & Help */}
        <FAQSection />
      </main>

      <Footer />

      {/* Citizen Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        currentUser={currentUser}
        onClose={() => setIsAuthOpen(false)}
        onUserChange={(user) => setCurrentUser(user)}
      />
    </>
  );
}
