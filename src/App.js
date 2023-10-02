import React from "react";
import { LanguageProvider } from "./components/hooks/useLangs";
import Header from "./components/Header/Header";
import Layout from "./pages/Layout/Layout";
import Controller from "./components/Controller/Controller";
import ProjectList from "./components/ProjectList/ProjectList";

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Header />
        <ProjectList />
        <Controller />
      </Layout>
    </LanguageProvider>
  );
}

export default App;
