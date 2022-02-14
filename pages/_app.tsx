import "../styles/globals.css"
import { ApolloProvider } from "@apollo/client/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { client } from "../Apollo";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
