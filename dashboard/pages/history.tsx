import React, { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function History() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch(`${API}/signals/history/${symbol}?limit=200`);
    setItems(await res.json());
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Signal History</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <button onClick={load}>Load</button>
      </div>

      <pre
        style={{
          marginTop: 16,
          background: "#f7f7f7",
          padding: 12,
          borderRadius: 12,
          overflowX: "auto",
        }}
      >
        {JSON.stringify(items.slice(0, 30), null, 2)}
      </pre>
    </div>
  );
}
