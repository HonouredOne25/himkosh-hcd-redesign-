import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client on server-side if API key is provided
let aiClient = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("[HimKosh AI] Error initializing Gemini client:", err);
  }
}

// Fallback intelligent simulated responses tailored for HimKosh HCD concept
function getSimulatedResponse(text) {
  const q = text.toLowerCase();

  if (q.includes("vehicle") || q.includes("traffic") || q.includes("transport") || q.includes("fine") || q.includes("speed")) {
    return {
      reply: "For a vehicle challan or transport fee, select 'Transport & Traffic' in the payment flow. You will only need your vehicle registration number (e.g., HP 01 A 1234) or challan reference number. Our redesigned form shows just the required fields without asking for confusing treasury DDO codes.",
      suggestedAction: "pay",
      actionLabel: "Start Vehicle Payment →",
      targetId: "payment-section",
    };
  }

  if (q.includes("receipt") || q.includes("download") || q.includes("proof")) {
    return {
      reply: "To locate or download your receipt, use the 'Find a Receipt' tool with your 14-character HIMGRN number (e.g., HP26-TR-849102) or Transaction ID. You can instantly preview and download a simulated PDF receipt without signing in.",
      suggestedAction: "receipt",
      actionLabel: "Find Your Receipt →",
      targetId: "receipt-section",
    };
  }

  if (q.includes("himgrn") || q.includes("meaning") || q.includes("what is")) {
    return {
      reply: "HIMGRN stands for 'Himachal Pradesh Government Receipt Number'. It is the unique 14-character reference code automatically generated whenever an e-Challan or payment is created. You can use it anytime to track payment status, verify transactions, or reprint your receipt.",
      suggestedAction: "verify",
      actionLabel: "Verify a HIMGRN →",
      targetId: "verify-section",
    };
  }

  if (q.includes("pending") || q.includes("debited") || q.includes("deducted") || q.includes("failed")) {
    return {
      reply: "If your payment shows 'Pending', the issuing bank is still reconciling the transaction with the state treasury. In our redesign, we recommend waiting 15 minutes and verifying with your HIMGRN before initiating a duplicate payment. In this prototype, all statuses are simulated for testing.",
      suggestedAction: "verify",
      actionLabel: "Check Challan Status →",
      targetId: "verify-section",
    };
  }

  if (q.includes("wrong") || q.includes("mistake") || q.includes("cancel") || q.includes("edit")) {
    return {
      reply: "In our human-centered flow, Step 3 gives you a dedicated 'Review' step before any payment is authorized so you can spot and edit any typo. If a challan has already been paid in real systems, corrections require departmental grievance; in this demo, you can simply start a new test challan.",
      suggestedAction: "pay",
      actionLabel: "Review Payment Flow →",
      targetId: "payment-section",
    };
  }

  if (q.includes("department") || q.includes("head") || q.includes("major head") || q.includes("confused")) {
    return {
      reply: "A key human-centered improvement of this redesign is eliminating the need to know government departmental hierarchies. You simply choose your task (e.g. Traffic fine, Land revenue, Excise duty), and the system maps it to the correct government service automatically.",
      suggestedAction: "pay",
      actionLabel: "Explore Services →",
      targetId: "payment-section",
    };
  }

  if (q.includes("verify") || q.includes("check status") || q.includes("track")) {
    return {
      reply: "You can verify any challan in seconds! Head to the 'Verify a Challan' section, enter your HIMGRN number, and get an immediate plain-language status breakdown (Paid, Pending, Failed, or Expired) along with your next recommended action.",
      suggestedAction: "verify",
      actionLabel: "Go to Verification →",
      targetId: "verify-section",
    };
  }

  return {
    reply: "I can help clarify government payment steps, explain confusing terms like HIMGRN or DDO codes, assist with vehicle challans, or guide you to your receipt. Tell me what civic task you want to complete today!",
    suggestedAction: "help",
    actionLabel: "Browse Common Questions →",
    targetId: "faq-section",
  };
}

export async function POST(request) {
  try {
    const { message = "" } = await request.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message prompt is required." },
        { status: 400 }
      );
    }

    const cleanMsg = message.trim();

    // If Gemini client is configured on the server, call the real Gemini 3.8 Flash model
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const response = await aiClient.models.generateContent({
          model: "gemini-3.8-flash",
          contents: cleanMsg,
          config: {
            systemInstruction:
              "You are the HimKosh Citizen Assistant for the Human-Centered Design (HCD) redesign of Himachal Pradesh's e-Challan service. " +
              "This is an independent academic concept prototype. You must explain citizen services in clear, empathetic, plain language without bureaucratic jargon. " +
              "Help citizens with vehicle fines, road tax, property revenue, excise fees, understanding HIMGRN (Himachal Government Receipt Number), " +
              "checking pending or failed transactions, and finding receipts. " +
              "Never claim that you have debited money or completed a real government transaction. Keep answers under 3-4 sentences and mention what section of the app to use.",
          },
        });

        const replyText = response.text || "";
        if (replyText) {
          // Determine matching app action from the user's intent
          const sim = getSimulatedResponse(cleanMsg);
          return NextResponse.json({
            reply: replyText,
            simulated: false,
            suggestedAction: sim.suggestedAction,
            actionLabel: sim.actionLabel,
            targetId: sim.targetId,
          });
        }
      } catch (geminiError) {
        console.warn("[HimKosh AI] Gemini API call error, falling back to simulated engine:", geminiError);
      }
    }

    // Fallback to rich simulated guidance
    const result = getSimulatedResponse(cleanMsg);
    return NextResponse.json({
      reply: result.reply,
      simulated: true,
      suggestedAction: result.suggestedAction,
      actionLabel: result.actionLabel,
      targetId: result.targetId,
    });
  } catch (error) {
    console.error("[HimKosh AI] Server route error:", error);
    return NextResponse.json(
      {
        reply: "I am ready to help you navigate your civic payments. Please describe what fee or receipt you are looking for.",
        simulated: true,
      },
      { status: 200 }
    );
  }
}
