
// import { useState } from "react";
// import { aiChat } from "../api";
// // import "./aichat.css";

// export default function AiChatPage() {
//   const [q, setQ] = useState("");
//   const [ans, setAns] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function ask() {
//     if (!q.trim()) return;

//     setLoading(true);
//     try {
//       const res = await aiChat(q);
//       setAns(res.data.result);
//     } catch (err) {
//       setAns("AI service unavailable. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="page">
//       <h2>Placement AI Assistant</h2>

//       <textarea
//         placeholder="Ask placement-related questions..."
//         value={q}
//         onChange={(e) => setQ(e.target.value)}
//       />

//       <button onClick={ask} disabled={loading}>
//         {loading ? "Thinking..." : "Ask AI"}
//       </button>

//       {ans && <div className="answer">{ans}</div>}
//     </div>
//   );
// }

import { useState } from "react";
import { aiChat } from "../api";
import "./aichat.css";

export default function AiChatPage() {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!q.trim()) return;

    const userMsg = { role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQ("");
    setLoading(true);

    try {
      const res = await aiChat(q);
      const aiMsg = { role: "ai", text: res.data.result };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI service unavailable. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-page">
      <div className="ai-card">
        <h2>Placement AI Assistant</h2>
        <p className="ai-subtitle">
          Get help with resumes, interviews, skills & placements
        </p>

        <div className="ai-chat-box">
          {messages.length === 0 && (
            <div className="ai-placeholder">
              Ask anything about placements 👇
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`ai-message ${m.role === "user" ? "user" : "ai"}`}
            >
              {m.text}
            </div>
          ))}

          {loading && <div className="ai-message ai">Thinking...</div>}
        </div>

        <div className="ai-input-row">
          <textarea
            placeholder="Ask placement-related questions..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && ask()}
          />
          <button onClick={ask} disabled={loading}>
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}
