import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are Mesh, the friendly AI assistant for ContentMesh — an AI-powered creative studio.

ContentMesh services:
- AI Video Production & AI Animation
- AI Voiceovers & AI Image / Marketing Content
- Professional Video Editing & Motion Graphics
- Commercial Advertisement Production & Brand Films
- In-house Video Production & Social Media Content

Your job:
1. Answer questions about ContentMesh services clearly and concisely.
2. Recommend the most suitable service based on the client's goals (help them choose between AI videos, AI images, editing, animation, voiceovers, branding, etc.).
3. Ask smart discovery questions to collect project requirements.
4. Generate creative ideas and content directions when helpful.
5. Encourage users to book a discovery call at /contact and collect leads (name, email, company, project details) naturally in conversation.
6. When asked for pricing, DO NOT invent numbers — direct them to the Pricing page (/pricing) or a discovery call.
7. Never claim to transfer to a human. Instead, point them to /contact for the team.

Tone: warm, confident, concise. Use short paragraphs. Focus on being genuinely helpful to potential clients.`;

async function handlePost({ request }: { request: Request }) {
  try {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500 });

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });

    const trimmed = messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user",
      content: String(m.content ?? "").slice(0, 4000),
    }));

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      const status = res.status === 429 ? 429 : res.status === 402 ? 402 : 500;
      const msg =
        status === 429
          ? "Rate limit reached — please try again in a moment."
          : status === 402
          ? "AI usage limit reached. Please add credits in your workspace."
          : "Chat is temporarily unavailable.";
      console.error("Chat gateway error", res.status, text);
      return new Response(JSON.stringify({ error: msg }), { status });
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const reply = data.choices?.[0]?.message?.content ?? "";
    return Response.json({ reply });
  } catch (err) {
    console.error("Chat handler crash", err);
    return new Response(JSON.stringify({ error: "Chat is temporarily unavailable." }), { status: 500 });
  }
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: handlePost,
    },
  },
});
