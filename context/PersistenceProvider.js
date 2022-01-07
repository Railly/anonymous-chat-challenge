import { createContext } from "react";
import { idb } from "db";
import { BroadcastChannel } from "broadcast-channel";

export const PersistenceContext = createContext();

export default function PersistenceProvider({ children }) {
  const channel = new BroadcastChannel("chat-bc");

  return (
    <PersistenceContext.Provider
      value={{
        channel,
        idb,
      }}
    >
      {children}
    </PersistenceContext.Provider>
  );
}
