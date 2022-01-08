import { createContext, useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { UserContext } from "./UserContext";
import { PersistenceContext } from "./PersistenceProvider";

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
  const [currentGroupChatId, setCurrentGroupChatId] = useState("");
  const [currentPrivateChatId, setCurrentPrivateChatId] = useState("");

  const { currentUser } = useContext(UserContext);
  const { idb } = useContext(PersistenceContext);

  const categories = useLiveQuery(() => {
    if (currentUser) {
      return idb.categories.reverse().toArray();
    }
  }, [currentUser]);

  const messages = useLiveQuery(() => {
    if (currentUser) {
      return idb.messages
        .where("userId")
        .equals(+currentUser?.id)
        .or("otherUserId")
        .equals(+currentUser?.id)
        .toArray();
    }
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        categories,
        messages,
        currentGroupChatId,
        currentPrivateChatId,
        setCurrentGroupChatId,
        setCurrentPrivateChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
