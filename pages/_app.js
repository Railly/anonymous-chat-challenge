import { BroadcastChannel } from "broadcast-channel";
import ChatContextProvider from "context/ChatContext";
import UserContextProvider from "context/UserContext";
import AppLayout from "components/AppLayout";
import { useEffect } from "react/cjs/react.development";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import MainSidebar from "containers/MainSidebar";
import ChatSidebar from "containers/ChatSidebar";
import PersistenceProvider from "context/PersistenceProvider";

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, span, div {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: "#022C52";
  }

  html {
    height: 100%;
  }
  
  body {
    min-height: 100%;
  }
`;

const theme = {
  colors: {
    primary: "#0080F4",
    secondary: "#3DD668",
    tertiary: "#8F3FFF",
    borderPrimary: "#0080F4",
    lightPrimary: "#D3EAFE",
    mediumPrimary: "#90CAFE",
    black: "#022C52",
    white: "#F1F8FF",
    gray: "#7F8E9C",
    transparent: "transparent",
  },

  darkColors: {
    secondary: "#32B757",
    tertiary: "#6D20D9",
  },

  lightColors: {
    secondary: "#C3FFD4",
    tertiary: "#F3DEFF",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <PersistenceProvider>
          <UserContextProvider>
            <ChatContextProvider>
              <AppLayout>
                <MainSidebar />
                <Component {...pageProps} />
                <ChatSidebar />
              </AppLayout>
            </ChatContextProvider>
          </UserContextProvider>
        </PersistenceProvider>
      </ThemeProvider>
    </>
  );
}
