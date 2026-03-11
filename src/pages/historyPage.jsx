import React, { useEffect, useState } from "react";

export const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/history");
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Group questions by topic
  const grouped = history.reduce((acc, item) => {
    if (!acc[item.topic]) acc[item.topic] = [];
    acc[item.topic].push(item);
    return acc;
  }, {});

  const topicColors = [
    "from-[#5865f2] to-[#4752c4]",
    "from-[#57f287] to-[#3ba55d]",
    "from-[#eb459e] to-[#c03882]",
    "from-[#fee75c] to-[#d4c24e]",
    "from-[#ed4245] to-[#c03537]",
  ];

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-[#0f1117] px-6 pt-6 pb-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;600;700&display=swap');
        .history-root { font-family: 'Syne', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2e3140; border-radius: 4px; }
      `}</style>

      <div className="history-root max-w-3xl mx-auto">

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="flex gap-1.5">
              {[0, 0.15, 0.3].map((delay, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#5865f2]"
                  style={{ animation: `bounce 1.2s ${delay}s infinite ease-in-out` }}
                />
              ))}
            </div>
            <p className="text-[#3d4159] text-sm font-mono">Loading history...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🕘</div>
            <p className="text-white font-bold text-xl mb-2">No history yet</p>
            <p className="text-[#5a5f77] text-sm max-w-xs leading-relaxed">
              Questions you generate will appear here, grouped by topic.
            </p>
          </div>
        )}

        {/* Grouped topic cards */}
        {!isLoading && Object.keys(grouped).length > 0 && (
          <div className="flex flex-col gap-5">
            {Object.entries(grouped).map(([topic, items], groupIdx) => (
              <div
                key={topic}
                className="bg-[#161820] border border-[#1e2130] rounded-2xl overflow-hidden"
              >
                {/* Topic header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2130]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${topicColors[groupIdx % topicColors.length]}`} />
                    <span className="text-white font-bold text-base tracking-tight">{topic}</span>
                  </div>
                  <span className="text-xs font-mono text-[#57f287] bg-[#0d2018] border border-[#1a3d28] rounded px-2 py-0.5">
                    {items.length} question{items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Questions list */}
                <ul className="flex flex-col divide-y divide-[#1a1d2e]">
                  {items.map((item, idx) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-[#1a1d2e] transition-colors group"
                    >
                      <span className="min-w-[28px] h-7 rounded-full bg-[#1e2235] border border-[#2a2f4a] text-[#5865f2] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#5865f2] transition-colors">
                        {idx + 1}
                      </span>
                      <span className="text-[#cdd0e0] text-sm leading-relaxed">{item.question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};