import React from "react";
import { LanguageProvider } from "./components/hooks/useLangs";
import Header from "./components/Header/Header";
import Layout from "./pages/Layout/Layout";
import Controller from "./components/Controller/Controller";

import ProjectListItem from "./components/ProjectListItem/ProjectListItem";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Header />
        <ProjectListItem />
        <Controller />
      </Layout>
    </LanguageProvider>
  );
}

export default App;
