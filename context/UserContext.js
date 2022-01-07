import { createContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react/cjs/react.development";

export const UserContext = createContext();

export default function UserContextProvider({ children, idb, channel }) {
  const [currentUserId, setCurrentUserId] = useState("");

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
      console.log("Added user", userId);
      setCurrentUserId(userId);
    };

    addUser();

    // channel.onmessage = (message) => {
    //   if (message.data.type === "ADD_MESSAGE") {
    //     const { payload } = message.data;
    //     idb.messages.add(payload);
    //   }
    // };

    // const closeChannel = async (userId) => {
    //   channel.postMessage({
    //     type: "CLOSE_CHANNEL",
    //     payload: {
    //       userId,
    //     },
    //   });
    // };

    // return () => {
    //   closeChannel(userId);
    // };
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
