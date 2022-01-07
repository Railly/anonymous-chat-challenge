import Dexie from "dexie";

export const idb = new Dexie("myDatabase");

idb.version(1).stores({
  users: "++id, name",
  categories: "++id, name",
  chats: "++id, name, categoryId",
  messages: "++id, chatId, text, userId, createdAt",
});
