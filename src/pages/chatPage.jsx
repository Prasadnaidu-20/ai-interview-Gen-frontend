import { useState, useRef, useEffect } from "react";
import { HistoryPage } from "./historyPage";

function Chat() {
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("chat");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateQuestions = async () => {
    if (!topic.trim() || isLoading) return;
    const currentTopic = topic;
    setMessages((prev) => [...prev, { type: "user", text: currentTopic, time: new Date() }]);
    setTopic("");
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/generate?topic=${currentTopic}`);
      const data = await res.json();
      const questions = data.map((q) => q.question);
      setMessages((prev) => [...prev, { type: "bot", text: questions, time: new Date() }]);
    } catch (error) {
      setMessages((prev) => [...prev, { type: "bot", text: ["⚠️ Error generating questions. Please try again."], time: new Date() }]);
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateQuestions();
    }
  };

  const formatTime = (date) =>
    date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const Sidebar = () => (
    <aside className="w-60 bg-[#161820] border-r border-[#1e2130] flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[#1e2130]">
        <span className="text-2xl">⚡</span>
        <span className="text-white font-bold text-lg tracking-tight">InterviewAI</span>
      </div>

      <nav className="flex flex-col gap-0.5 p-2 flex-1">
        {["General", "Java", "React", "DSA", "System Design"].map((item) => (
          <button
            key={item}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-[#8b8fa8] text-sm hover:bg-[#1e2235] hover:text-[#a8b0d4] transition-colors text-left w-full"
            onClick={() => { setTopic(item); setActivePage("chat"); }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d4159] shrink-0" />
            {item}
          </button>
        ))}

        <div className="h-px bg-[#1e2130] my-2 mx-1" />

        <button
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left w-full ${
            activePage === "history"
              ? "bg-[#1e2235] text-[#a8b0d4]"
              : "text-[#8b8fa8] hover:bg-[#1e2235] hover:text-[#a8b0d4]"
          }`}
          onClick={() => setActivePage("history")}
        >
          <span className="text-sm">🕘</span>
          History
        </button>
      </nav>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-[#1e2130] bg-[#131520]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5865f2] to-[#4752c4] flex items-center justify-center text-white text-xs font-bold shrink-0">
          U
        </div>
        <div>
          <div className="text-sm font-semibold text-[#e4e6eb]">User</div>
          <div className="text-xs text-[#3ba55d]">● Online</div>
        </div>
      </div>
    </aside>
  );

  if (activePage === "history") {
  return (
    <div className="flex h-screen bg-[#0f1117] text-[#e4e6eb] overflow-hidden font-sans">
      <Sidebar />
      <main className="flex flex-col flex-1 overflow-hidden">  {/* ← overflow-hidden here */}
        <header className="flex items-center justify-between px-6 py-3.5 border-b border-[#1e2130] bg-[#161820] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕘</span>
            <span className="text-white font-bold text-base">history</span>
          </div>
          <button
            className="text-xs text-[#5a5f77] border border-[#1e2130] rounded-md px-3 py-1.5 hover:text-[#a8b0d4] hover:border-[#2a2f4a] transition-colors"
            onClick={() => setActivePage("chat")}
          >
            ← Back to Chat
          </button>
        </header>
        <HistoryPage />  
      </main>
    </div>
  );
}

  return (
    <div className="flex h-screen bg-[#0f1117] text-[#e4e6eb] overflow-hidden font-sans">
      <Sidebar />

      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3.5 border-b border-[#1e2130] bg-[#161820] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl text-[#4b5063] font-bold">#</span>
            <span className="text-white font-bold text-base">interview-questions</span>
          </div>
          <span className="text-xs text-[#5a5f77]">AI-powered question generator</span>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-3 flex flex-col gap-4 scrollbar-thin">
          {messages.length === 0 && (
            <div className="m-auto text-center p-10">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-white font-bold text-xl mb-2">Start a conversation</p>
              <p className="text-[#5a5f77] text-sm max-w-xs leading-relaxed">
                Type a topic like "Java", "React", or "System Design" to generate interview questions.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2.5 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#57f287] to-[#3ba55d] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  AI
                </div>
              )}

              <div className="max-w-[70%]">
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
                    msg.type === "user"
                      ? "bg-gradient-to-br from-[#5865f2] to-[#4752c4] text-white rounded-br-sm"
                      : "bg-[#1e2130] text-[#cdd0e0] border border-[#262a3d] rounded-bl-sm"
                  }`}
                >
                  {Array.isArray(msg.text) ? (
                    <ol className="flex flex-col gap-2.5 list-none">
                      {msg.text.map((q, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="min-w-[22px] h-[22px] rounded-full bg-[#2d3250] text-[#7c83a8] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                            {i + 1}
                          </span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                </div>
                <div className={`text-[10px] text-[#3d4159] mt-1 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                  {formatTime(msg.time)}
                </div>
              </div>

              {msg.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5865f2] to-[#4752c4] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  U
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#57f287] to-[#3ba55d] flex items-center justify-center text-white text-xs font-bold shrink-0">
                AI
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[#1e2130] border border-[#262a3d]">
                <div className="flex gap-1.5 items-center px-1 py-0.5">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      className="inline-block w-1.5 h-1.5 rounded-full bg-[#5a5f77]"
                      style={{ animation: `bounce 1.2s ${delay}s infinite ease-in-out` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 px-6 py-4 bg-[#161820] border-t border-[#1e2130] shrink-0">
          <input
            type="text"
            value={topic}
            placeholder="Enter a topic (e.g. Java, Arrays, React)..."
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-[#0f1117] border border-[#262a3d] rounded-xl px-4 py-3 text-[#e4e6eb] text-sm outline-none focus:border-[#5865f2] transition-colors placeholder-[#3d4159]"
          />
          <button
            onClick={generateQuestions}
            disabled={isLoading || !topic.trim()}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5865f2] to-[#4752c4] text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;600;700&display=swap');
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2e3140; border-radius: 4px; }
      `}</style>
    </div>
  );
}

export default Chat;