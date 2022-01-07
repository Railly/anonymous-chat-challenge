import { createContext, useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { UserContext } from "./UserContext";

export const ChatContext = createContext();

export default function ChatContextProvider({ children, idb, channel }) {
  // const [currentChatId, setCurrentChatId] = useState(null);
  // const [categories, setCategories] = useState([]);
  // const [chats, setChats] = useState([]);
  // const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(UserContext);
  const categories = useLiveQuery(() => idb.categories.toArray());
  const chats = useLiveQuery(() => idb.chats.toArray());
  const messages = useLiveQuery(() => idb.messages.toArray());

  return (
    <ChatContext.Provider
      value={{
        categories,
        chats,
        messages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
