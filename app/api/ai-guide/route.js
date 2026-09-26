import { NextResponse } from "next/server";

export async function POST(request) {
  const { message = "" } = await request.json();
  const q = message.toLowerCase();
  let reply = "Tell me what you're trying to accomplish and I’ll help identify the next step. This prototype does not perform real transactions.";
  if (q.includes("vehicle")) reply = "For a vehicle-related task, start with Transport. I can then guide you through the relevant reference number and service.";
  else if (q.includes("verify") || q.includes("receipt")) reply = "Use your HIMGRN to verify a challan. It is shown on your challan receipt.";
  else if (q.includes("department")) reply = "You don't need to know the department first. Describe your goal in plain language and the guide can map it to a service.";
  return NextResponse.json({ reply, demo: true });
}
