export const reduceToUnique = (acc, curr) => {
  if (!acc.find((item) => item.chatId === curr.chatId)) {
    acc.push(curr);
  }
  return acc;
};
