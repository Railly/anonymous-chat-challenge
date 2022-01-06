import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, span, div {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#0080F4",
    secondary: "#F4B000",
    tertiary: "#C170F2",
    borderPrimary: "#0080F4",
    lightPrimary: "#D3EAFE",
    black: "#022C52",
    white: "#F1F8FF",
    gray: "#7F8E9C",
    transparent: "transparent",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
