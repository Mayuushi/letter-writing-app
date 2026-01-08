import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

export default function App() {
  return (
    <div className="container">
      <h1>💌 Public Letter Wall</h1>
      <MessageForm />
      <MessageList />
    </div>
  );
}
