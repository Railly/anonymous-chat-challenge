import S from "components/Elements";

export default function Logo(props) {
  return (
    <S.Heading.H1
      display="flex"
      items="center"
      justify="center"
      text="lg"
      mt={2}
      px={4}
      py={2}
    >
      <svg
        width={40}
        height={40}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx={12} cy={12} r={12} fill="#0080F4" />
        <circle cx={12} cy={12} r={6.635} fill="#fff" />
        <circle cx={8.918} cy={10.471} r={0.918} fill="#0080F4" />
        <circle cx={15.082} cy={10.471} r={0.918} fill="#0080F4" />
        <path
          d="M15.009 12.338c.38.04.662.383.551.749a3.691 3.691 0 0 1-1.067 1.677 3.73 3.73 0 0 1-6.045-1.65c-.114-.366.166-.712.546-.754.379-.043.711.238.864.587a2.344 2.344 0 0 0 4.291-.016c.15-.35.48-.633.86-.593Z"
          fill="#0080F4"
        />
        <path
          d="m5.365 11.765 1.953 2.605 1.858 2.65L5.365 20v-8.235Z"
          fill="#fff"
        />
      </svg>
      <S.Span ml={2}>Chat App</S.Span>
    </S.Heading.H1>
  );
}
