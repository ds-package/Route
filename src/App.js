import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/hooks/useLangs";
import Layout from "./pages/Layout/Layout";
import Controller from "./components/Controller/Controller";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
// import ProjectPost from "./pages/ProjectPost/ProjectPost";

function App() {
  return (
    <LanguageProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="/:language/:projectId" element={<ProjectDetail />} />
            <Route path="/posts/:language/:postId" element={<BlogDetail />} />
          </Routes>
          <Controller />
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
