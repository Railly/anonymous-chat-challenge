import { createContext, useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

export const UserContext = createContext();

export default function UserContextProvider({ children, idb }) {
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const addUser = async () => {
      const userId = await idb.users.add({
        name: `User ${Math.floor(Math.random() * 1000)}`,
      });

      // channel.postMessage({
      //   type: "ADD_USER",
      //   payload: {
      //     userId,
      //   },
      // });

      setCurrentUserId(userId);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
