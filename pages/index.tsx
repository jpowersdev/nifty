import Head from "next/head";
import React from "react";
import Sidebar from "../components/Sidebar";
import { initializeStore } from "../store";
import { Page, Main } from "../styles/components";
import GetSiteUrl from "../components/Slides/GetSiteUrl";
import SelectFile from "../components/Slides/SelectFile";
import ApproveList from "../components/Slides/ApproveList";
import Authenticate from "../components/Slides/Authenticate";
import Upload from "../components/Slides/Upload";
import Results from "../components/Slides/Results";
import AssignColumns from "../components/Slides/AssignColumns";

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Importer | NiftyWP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      <Main>
        <GetSiteUrl />
        <SelectFile />
        <AssignColumns />
        <ApproveList />
        <Authenticate />
        <Upload />
        <Results />
      </Main>
    </Page>
  );
}

export function getServerSideProps() {
  const reduxStore = initializeStore();

  return { props: { initialReduxState: reduxStore.getState() } };
}
