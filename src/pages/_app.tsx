import { use, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { persistor, store } from "store";
import { Layout } from "layout";
import { useRouter } from "next/router";
import { Spinner } from "../components";
import "react-loading-skeleton/dist/skeleton.css";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (router.pathname === url) {
        return
      }
      setIsLoading(true);
    };
    const handleRouteComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router.asPath]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            {loading && <Spinner />}
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
