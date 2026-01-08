import { useEffect, useState } from "react";

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

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
