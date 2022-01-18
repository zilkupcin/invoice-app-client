import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import HomeHeader from "../components/HomeHeader";
import InvoiceList from "../components/InvoiceList";
import React from "react";
import NoContent from "../components/NoContent";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <HomeHeader />
      {/* <InvoiceList /> */}
      {/* <NoContent /> */}
    </React.Fragment>
  );
};

export default Home;
