import React, { useContext } from "react";
import Cam from "../../images/chat/cam.png";
import Add from "../../images/chat/add.png";
import More from "../../images/chat/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../stores/ChatContext";

const Chat = () => {
  const { data }: { data: any } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
