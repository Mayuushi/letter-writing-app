import { useEffect, useState } from "react";

export default function MessageList({ messages }) {
  if (!Array.isArray(messages)) {
    return <p>Failed to load messages.</p>;
  }

  if (messages.length === 0) {
    return <p>No messages yet.</p>;
  }

  return (
    <div className="messages">
      {messages.map((m, i) => (
        <div key={i} className="message">
          <strong>{m.name}</strong>
          <p>{m.message}</p>
          <small>{new Date(m.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

