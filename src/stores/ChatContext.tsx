import React from "react";
import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./Auth";

export const ChatContext = createContext({
  data: {},
  dispatch: ({}) => {},
});

export const ChatProvider = ({ children }: { children: any }) => {
  const { currentChatUser }: { currentChatUser: any } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentChatUser.uid > action.payload.uid
              ? currentChatUser.uid + action.payload.uid
              : action.payload.uid + currentChatUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
