import React, { useContext } from "react";
import { LanguageContext } from "../hooks/useLangs";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";

const Header = () => {
  const { language } = useContext(LanguageContext);
  let paragraphText;

  if (language === "en") {
    paragraphText = (
      <p>
        Working as a design system product designer in Korea. Spending most of
        my time pondering on processes that can enhance the productivity of
        makers. I enjoy digital tools that can help with this.
      </p>
    );
  } else {
    paragraphText = (
      <p>
        한국에서 디자인 시스템 프로덕트 디자이너로 일하고 있습니다. 대부분의
        시간을 메이커의 생산성을 높일 수 있는 프로세스에 대한 고민으로 보냅니다.
        그리고 이를 도와줄 수 있는 디지털 도구들을 좋아합니다.
      </p>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        {paragraphText}
        <p>&copy;{new Date().getFullYear()} NoName</p>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
