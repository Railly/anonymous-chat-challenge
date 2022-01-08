import S from "components/Elements";

export default function Home() {
  return (
    <S.Section
      minHeight="100vh"
      bgColor="mediumPrimary"
      display="flex"
      justify="center"
      items="center"
    >
      <S.Heading.H1 text="lg" color="black" display="flex" items="center">
        <S.Span className="material-icons">chat</S.Span>
        <S.Span ml={2}>Selecciona un chat para empezar!</S.Span>
      </S.Heading.H1>
    </S.Section>
  );
}
