import Dexie from "dexie";

// import "fake-indexeddb/auto";

const idb = new Dexie("chat-db");

idb.version(1).stores({
  users: "++id, name",
  categories: "++id, name",
  groupChats:
    "++id, name, categoryId, lastMessage, lastMessageDate, lastMessageUserId, type",
  messages: "++id, chatId, text, userId, createdAt, type, otherUserId",
  directChats:
    "++id, otherUserId, currentUserId, lastMessage, lastMessageDate, lastMessageUserId, type",
});

export default idb;
