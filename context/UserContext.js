import { createContext, useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

export const UserContext = createContext();

export default function UserContextProvider({ children, idb }) {
  const [currentUserId, setCurrentUserId] = useState("");
  const [modalParams, setModalParams] = useState({});

  useEffect(async () => {
    const addUser = async () => {
      const userId = await idb.users.add({
        name: `User ${Math.floor(Math.random() * 1000)}`,
      });
      setCurrentUserId(userId);

      console.log("userId", userId);
      const users = await idb.users.toArray();
      const directChats = await idb.directChats.toArray();

      const bulk = users.map((user) => {
        const chat = directChats.find(
          (chat) =>
            (chat.otherUserId === user.id && chat.currentUserId === userId) ||
            (chat.otherUserId === userId && chat.currentUserId === user.id)
        );

        if (!chat) {
          return {
            otherUserId: user.id,
            currentUserId: userId,
            type: "private",
          };
        }
      });

      if (bulk) {
        await idb.directChats.bulkAdd(bulk);
      }
    };

    addUser();
  }, []);

  const dbUsers = useLiveQuery(() => {
    if (currentUserId) {
      return idb.users.toArray();
    }
  }, [currentUserId]);

  const dbMyUser = useLiveQuery(() => {
    if (currentUserId) {
      return idb.users
        .where("id")
        .equals(+currentUserId)
        .first();
    }
  }, [currentUserId]);

  return (
    <UserContext.Provider
      value={{
        currentUser: dbMyUser,
        users: dbUsers,
        modalParams,
        setModalParams,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
