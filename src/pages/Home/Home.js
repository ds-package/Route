import React from "react";
import Header from "../../components/Header/Header";
import ProjectList from "../../components/ProjectList/ProjectList";
import MetaTag from "../../utils/metaTag";

const Home = () => {
  const pageTitle = "Route"; // 페이지 제목
  const pageDescription =
    "Design systems and product designers portfolios and records"; // 페이지 설명
  const pageName = "Route Finding"; // Facebook og:site_name
  const pageUrl = "https://route-finding.vercel.app/"; // 페이지 URL
  const pageCustomUrl = "route-finding.vercel.app"; // Twitter twitter:domain
  const pageType = "website"; // Facebook og:type
  const pageOgImage =
    "https://user-images.githubusercontent.com/43980992/277132547-39d002f0-67f2-4030-a365-3d27eb8525d1.png"; // 이미지 URL

  return (
    <div>
      <MetaTag
        title={pageTitle}
        description={pageDescription}
        name={pageName}
        url={pageUrl}
        customUrl={pageCustomUrl}
        type={pageType}
        ogImage={pageOgImage}
      />
      <Header />
      <ProjectList />
    </div>
  );
};

export default Home;
