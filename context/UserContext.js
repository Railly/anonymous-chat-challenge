import { createContext, useContext, useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "./PersistenceProvider";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState("");
  const { idb, channel } = useContext(PersistenceContext);

  useEffect(() => {
    const addUser = async () => {
      const userId = await idb.users.add({
        name: `User ${Math.floor(Math.random() * 1000)}`,
      });

      channel.postMessage({
        type: "ADD_USER",
        payload: {
          userId,
        },
      });

      setCurrentUserId(userId);
    };

    addUser();
  }, []);

  const dbUsers = useLiveQuery(() => idb.users.toArray());
  const dbMyUser = useLiveQuery(() => {
    return idb.users.where("id").equals(currentUserId).first();
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
