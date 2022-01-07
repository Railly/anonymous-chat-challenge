import { createContext, useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { UserContext } from "./UserContext";
import { PersistenceContext } from "./PersistenceProvider";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [currentChatId, setCurrentChatId] = useState("");
  const { currentUser } = useContext(UserContext);
  const { idb } = useContext(PersistenceContext);
  const categories = useLiveQuery(() => idb.categories.toArray());
  const chats = useLiveQuery(() => idb.chats.toArray());
  const messages = useLiveQuery(() => idb.messages.toArray());

  return (
    <ChatContext.Provider
      value={{
        categories,
        chats,
        messages,
        currentChatId,
        setCurrentChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
