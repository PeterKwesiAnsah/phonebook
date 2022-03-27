import "../styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "../providers/Theme";
import { QueryClientProvider } from "react-query";
import { client } from "../lib/reactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container } from "../Layout";
import { Provider } from "react-redux";
import { store } from "../store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Theme>
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />

            <Toaster></Toaster>
          </Provider>
        </Container>
      </Theme>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default MyApp;
