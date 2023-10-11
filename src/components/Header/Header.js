import React, { useContext } from "react";
import { LanguageContext } from "../hooks/useLangs";
import { Link } from "react-router-dom";
import { HouseSimple } from "@phosphor-icons/react";
import Menu from "../Menu/Menu";
import styles from "./Header.module.css";

const Header = () => {
  const { language } = useContext(LanguageContext);
  let paragraphText;

  if (language === "en") {
    paragraphText = (
      <h6>
        Working as a design system product designer in Korea. Spending most of
        my time pondering on processes that can enhance the productivity of
        makers. I enjoy digital tools that can help with this.
      </h6>
    );
  } else {
    paragraphText = (
      <h6>
        한국에서 디자인 시스템 프로덕트 디자이너로 일하고 있습니다. 대부분의
        시간을 메이커의 생산성을 높일 수 있는 프로세스에 대한 고민으로 보냅니다.
        그리고 이를 도와줄 수 있는 디지털 도구들을 좋아합니다.
      </h6>
    );
  }

  return (
    <header className={styles.header}>
      <Link to="/">
        <HouseSimple size={24} weight="fill" />
      </Link>
      <div className={styles.container}>
        <div className={styles.paragraphText}>{paragraphText}</div>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
