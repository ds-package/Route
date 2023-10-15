import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  // 상태(state)를 통해 네비게이션 바의 숨김 여부를 관리
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // 스크롤 이벤트 핸들러: 스크롤 위치에 따라 네비게이션 바를 숨김/표시
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHidden(scrollY > lastScrollY); // 스크롤 방향에 따라 숨김 여부 업데이트
      lastScrollY = scrollY; // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 등록

    // 컴포넌트 언마운트 시, 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.footer} ${
        isHidden ? styles.hidden : styles.visible
      }`}
    >
      <p>&copy;{new Date().getFullYear()} YMH </p>
    </div>
  );
};

export default Footer;
