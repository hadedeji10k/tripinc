import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./style.scss";

const ChatComponent = () => {
  return (
    <div className="chat-home">
      <div className="chat-container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatComponent;
