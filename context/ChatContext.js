import { createContext, useState } from "react";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        currentChatId,
        setCurrentChatId,
        categories,
        setCategories,
        chats,
        setChats,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
