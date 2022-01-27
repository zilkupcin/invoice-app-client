import "../styles/globals.scss";
import themeStyles from "../styles/Theme.module.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.scss";
import LoaderProvider from "../components/LoaderProvider";
import { useState } from "react";
import cn from "classnames";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={cn(styles.page, { [themeStyles[theme]]: true })}>
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
      <Sidebar onThemeSwitch={handleThemeSwitch} theme={theme} />
      <section className={styles.content}>
        <LoaderProvider>
          <Component {...pageProps} />
        </LoaderProvider>
      </section>
    </div>
  );
}

export default MyApp;
