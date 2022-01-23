import "../styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.scss";
import LoaderProvider from "../components/LoaderProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.page}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Spartan:wght@500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Sidebar />
      <section className={styles.content}>
        <LoaderProvider>
          <Component {...pageProps} />
        </LoaderProvider>
      </section>
    </div>
  );
}

export default MyApp;
