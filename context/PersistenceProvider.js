import { createContext } from "react";
// import { BroadcastChannel } from "broadcast-channel";
import idb from "db";

export const PersistenceContext = createContext();

export default function PersistenceProvider({ children }) {
  // const channel = new BroadcastChannel("chat-bc");

  return (
    <PersistenceContext.Provider
      value={{
        // channel,
        idb,
      }}
    >
      {children}
    </PersistenceContext.Provider>
  );
}
