import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import styles from "./TobbarSub.module.css"

const TopbarSub = () => {
  // 상태(state)를 통해 네비게이션 바의 숨김 여부를 관리
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // 스크롤 이벤트 핸들러: 스크롤 위치에 따라 네비게이션 바를 숨김/표시
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHidden(scrollY > lastScrollY);  // 스크롤 방향에 따라 숨김 여부 업데이트
      lastScrollY = scrollY;  // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener("scroll", handleScroll);  // 스크롤 이벤트 리스너 등록

    // 컴포넌트 언마운트 시, 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // 네비게이션 바 요소: 숨김 여부에 따라 클래스가 추가되어 스타일이 변경됨
    <div
      className={`${styles.topabarSub} ${
        isHidden ? styles.hidden : styles.visible
      }`}
    >
      {/* 뒤로 가기 링크 */}
      <Link className={styles.topabarSubLayout} to="/blog">
        <ArrowCircleLeft size={28} weight="fill" />
        <h5>Back</h5>
      </Link>
    </div>
  );
};

export default TopbarSub;
