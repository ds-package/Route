import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../components/hooks/useLangs";
import Topbar from "../../components/Topbar/Topbar";

// import Header from "../../components/Header/Header";

const About = () => {
  const { language } = useContext(LanguageContext);
  let aboutText;

  if (language === "en") {
    aboutText = (
      <p>
        Hello, I work as a design systems product designer in South Korea. My
        primary focus is on bridging the gap between design and development,
        creating tools and environments that allow makers to work more
        efficiently and immerse themselves in their tasks.
      </p>
    );
  } else {
    aboutText = (
      <p>
        안녕하세요, 한국에서 디자인 시스템 프로덕트 디자이너로 일하고 있습니다.
        주로 디자인과 개발 사이의 간극을 줄이고 메이커가 더 효율적이고
        몰입감있게 작업할 수 있는 도구와 환경을 만들고 제공하는 일에 중점을 두고
        있습니다.
      </p>
    );
  }

  return (
    <div>
      <Topbar />
      <h1>Hello </h1>
      {aboutText}
      <button className="btn">
        <Link to="mailto:mini940511@gmail.com">mail</Link>
      </button>
    </div>
  );
};

export default About;
