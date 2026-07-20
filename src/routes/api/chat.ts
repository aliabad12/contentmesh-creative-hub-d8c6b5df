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
2. Recommend the most suitable service based on the client's goals.
3. Ask smart discovery questions to understand project needs.
4. Generate creative ideas and content directions when helpful.
5. Encourage users to book a discovery call at /contact and collect leads naturally.
6. For pricing, direct users to /pricing or a discovery call — never invent numbers.
7. Never claim to transfer to a human — point them to /contact.

Tone: warm, confident, concise. Short paragraphs. Genuinely helpful.`;

async function handlePost({ request }: { request: Request }) {
  try {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({
          error:
            "Chatbot is not configured yet. Add your DEEPSEEK_API_KEY as a secret to enable Mesh.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) {
      return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
    }

    const trimmed = messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user",
      content: String(m.content ?? "").slice(0, 4000),
    }));

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("DeepSeek error", res.status, text);
      const status = res.status === 429 ? 429 : res.status === 401 ? 401 : 500;
      const msg =
        status === 429
          ? "Rate limit reached — please try again in a moment."
          : status === 401
          ? "Invalid DeepSeek API key. Please check your DEEPSEEK_API_KEY secret."
          : "Chat is temporarily unavailable.";
      return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const reply = data.choices?.[0]?.message?.content ?? "";
    return Response.json({ reply });
  } catch (err) {
    console.error("Chat handler crash", err);
    return new Response(JSON.stringify({ error: "Chat is temporarily unavailable." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: handlePost,
    },
  },
});
