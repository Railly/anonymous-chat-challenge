import S from "components/Elements";
import { ChatGroup } from "./ChatCategory";
import ChatUser from "./ChatUser";

export default function FilteredData({ users, groupChats, searchText }) {
  return (
    <>
      {users.length > 0 && <S.Heading.H3 my={2}>Usuarios</S.Heading.H3>}
      {users &&
        users
          .filter((user) => {
            return user.name.toLowerCase().includes(searchText.toLowerCase());
          })
          .map((user) => <ChatUser key={user.id} user={user} />)}
      {groupChats.length > 0 && <S.Heading.H3 my={2}>Grupos</S.Heading.H3>}
      {groupChats &&
        groupChats
          .filter((groupChat) => {
            return groupChat.name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          })
          .map((groupChat) => (
            <ChatGroup key={groupChat.id} chat={groupChat} />
          ))}
    </>
  );
}
