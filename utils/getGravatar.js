import md5 from "md5";

export const getGravatar = (email = "IDBI") => {
  return `https://www.gravatar.com/avatar/${md5(
    `${email.toLowerCase().split(" ").join("")}@idbi.com`
  )}?s=200&d=identicon&r=PG`;
};
