import React, { useContext } from "react";
import { LanguageContext } from "../../components/hooks/useLangs";
import Topbar from "../../components/Topbar/Topbar";
// import Header from "../../components/Header/Header";

const About = () => {
  const { language } = useContext(LanguageContext);
  let aboutText;
  let titleText;

  if (language === "en") {
    aboutText = (
      <h6>
        Working as a design system product designer in Korea. Spending most of
        my time pondering on processes that can enhance the productivity of
        makers. I enjoy digital tools that can help with this.
      </h6>
    );
    titleText = <h6>Hi</h6>;
  } else {
    aboutText = (
      <h6>
        한국에서 디자인 시스템 프로덕트 디자이너로 일하고 있습니다. 대부분의
        시간을 메이커의 생산성을 높일 수 있는 프로세스에 대한 고민으로 보냅니다.
        그리고 이를 도와줄 수 있는 디지털 도구들을 좋아합니다.
      </h6>
    );
    titleText = <h6>하이룽바이룽</h6>;
  }

  return (
    <div>
      <Topbar />
      {titleText}
      {aboutText}
    </div>
  );
};

export default About;
