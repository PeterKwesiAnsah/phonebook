import "../styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "../providers/Theme";
import { QueryClientProvider } from "react-query";
import { client } from "../lib/reactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container } from "../Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Theme>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Theme>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default MyApp;
