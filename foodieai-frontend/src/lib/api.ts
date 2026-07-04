import type { ChatResponse } from "../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function sendMessage(sessionId: string, message: string): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data: ChatResponse = await response.json();
  return data.reply;
}
export async function createOrder(payload: any): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Checkout failed");
  const data = await response.json();
  return data.order_number;
}

export async function fetchOrders(sessionId: string): Promise<any[]> {
  const response = await fetch(`${BACKEND_URL}/orders?session_id=${sessionId}`);
  if (!response.ok) return [];
  return await response.json();
}

export async function fetchChatHistory(sessionId: string): Promise<any[]> {
  const response = await fetch(`${BACKEND_URL}/history?session_id=${sessionId}`);
  if (!response.ok) return [];
  return await response.json();
}
