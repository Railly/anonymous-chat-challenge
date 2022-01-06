import S from "components/Elements";
import AppLayout from "components/layouts/AppLayout";
import MaterialIcon from "components/MaterialIcon";

export default function Home() {
  return (
    <AppLayout>
      <S.Div
        display="flex"
        items="center"
        justify="center"
        width="100%"
        height="100vh"
        bgColor="tertiary"
      >
        <S.Heading.H1 font="regular" display="flex" items="center">
          <MaterialIcon text="3xl" name="tag" />
          New
        </S.Heading.H1>
      </S.Div>
      <S.Div bgColor="primary" color="white">
        <MaterialIcon name="home" color="red" />
      </S.Div>
      <S.Div bgColor="secondary" color="white">
        <MaterialIcon name="lock" color="green" />
      </S.Div>
    </AppLayout>
  );
}
