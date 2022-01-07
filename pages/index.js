import S from "components/Elements";

export default function Home() {
  return (
    <S.Section minHeight="100vh" bgColor="mediumPrimary">
      <h1>
        <S.Span text="lg" className="material-icons">
          send
        </S.Span>
      </h1>
    </S.Section>
  );
}
