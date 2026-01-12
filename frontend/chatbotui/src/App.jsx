import { useState, useEffect, useRef } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId] = useState(() => Date.now().toString());

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessage("");
    setLoading(true);

    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);

    try {
      const res = await fetch("http://localhost:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          conversation_id: conversationId,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: data.response },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "Server error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[80vh] bg-zinc-900 rounded-2xl shadow-xl flex flex-col">

        {/* Header */}
<div className="flex items-center gap-3 p-4 border-b border-zinc-800">
  
  {/* Animated Logo */}
  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-green-400
                  flex items-center justify-center text-white font-bold text-lg
                  twix-logo">
  <div className="twix-logo spin-slow">🛰</div>
  </div>

  {/* Title */}
  <div className="flex flex-col">
    <span className="text-white font-semibold tracking-wide">
      TWIX-AI
    </span>
    <span className="text-xs text-zinc-400">
      AI Assistant
    </span>
  </div>

</div>

        {/* Chat */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow
                  ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-zinc-100"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="px-4 py-2 rounded-2xl bg-zinc-800 text-zinc-300 text-sm animate-pulse">
                AI is typing…
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="p-4 border-t border-zinc-800"
        >
          <div className="flex gap-3 items-center">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message"
              className="flex-1 bg-zinc-950 text-white px-4 py-3 rounded-xl outline-none text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
