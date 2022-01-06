import { createContext, useState } from "react";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [currentChatId, setCurrentChatId] = useState(null);

  return (
    <ChatContext.Provider value={{ currentChatId, setCurrentChatId }}>
      {children}
    </ChatContext.Provider>
  );
}
