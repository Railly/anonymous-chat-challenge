import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import { useContext } from "react/cjs/react.development";
import { useLiveQuery } from "dexie-react-hooks";
import md5 from "md5";
import Image from "next/image";

export default function MessageCard({ message }) {
  const { idb } = useContext(PersistenceContext);

  const user = useLiveQuery(() =>
    idb.users.where("id").equals(message.userId).first()
  );

  return (
    <>
      {user && (
        <S.Div>
          <Image
            width={50}
            height={50}
            src={`https://www.gravatar.com/avatar/${md5(
              `${user.name.toLowerCase().split(" ").join("")}@hotmail.com`
            )}?s=200&d=identicon&r=PG`}
          />
        </S.Div>
      )}
      <S.Span>{message.text}</S.Span>
    </>
  );
}
