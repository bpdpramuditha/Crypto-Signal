import React, { useEffect, useState } from "react";

type Signal = {
  id: number;
  symbol: string;
  timeframe: string;
  signal: string;
  confidence: number;
  reasons: string[];
  createdAt: string;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Home() {
  const [items, setItems] = useState<Signal[]>([]);

  useEffect(() => {
    fetch(`${API}/signals/latest?limit=50`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const wsUrl =
      API.replace("http://", "ws://").replace("https://", "wss://") + "/ws";
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === "signal") {
          setItems((prev) => [msg.data, ...prev].slice(0, 50));
        }
      } catch {}
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Crypto Signals (Live)</h1>
      <p>API: {API}</p>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{s.symbol}</strong>
              <span>{new Date(s.createdAt).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <b>{s.signal}</b> — Confidence: {s.confidence}%
            </div>
            <div style={{ marginTop: 6, color: "#444" }}>
              {s.reasons?.slice(0, 3).join(" | ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
