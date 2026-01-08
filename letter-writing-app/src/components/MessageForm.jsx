import { useState } from "react";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, anonymous }),
    });

    setMessage("");
    setName("");
    window.location.reload();
  };

  return (
    <form onSubmit={submit} className="form">
      {!anonymous && (
        <input
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <textarea
        placeholder="Write your letter..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <label>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        Post anonymously
      </label>

      <button>Send</button>
    </form>
  );
}
