import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../stores/Auth";
import { ChatContext } from "../../stores/ChatContext";

const Message = ({ message }) => {
  const { currentChatUser }: { currentChatUser: any } = useContext(AuthContext);

  const { data }: { data: any } = useContext(ChatContext);

  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentChatUser.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentChatUser.uid
              ? currentChatUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
