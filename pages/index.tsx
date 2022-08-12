import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "../src/Dashboard";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Dashboard />
    </div>
  );
};

export default Home;
