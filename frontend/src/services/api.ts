const API_BASE = import.meta.env.VITE_API_URL || '';

export interface ChatRequest {
  message: string;
  session_id: string;
  history: { role: string; content: string }[];
}

export interface ChatResponse {
  response: string;
  session_id: string;
  remaining_messages?: number;
  error?: string;
}

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (res.status === 429) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Rate limit exceeded. Please try again later.');
  }

  if (!res.ok) {
    throw new Error('Something went wrong. Please try again.');
  }

  return res.json();
}
