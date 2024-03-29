import "../styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "../providers/Theme";
import { QueryClientProvider } from "react-query";
import { client } from "../lib/reactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container } from "../Layout";
import { Provider } from "react-redux";
import { store } from "../store";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { ErrorFallback } from "../components/ErrorBoundaryFB";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Theme>
        <Container>
          <ErrorBoundary fallback={<ErrorFallback></ErrorFallback>}>
            <Provider store={store}>
              <Component {...pageProps} />

              <Toaster></Toaster>
            </Provider>
          </ErrorBoundary>
        </Container>
      </Theme>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default MyApp;
