import React from "react";
import styles from "./Header.module.css";
import Topbar from "../Topbar/Topbar";

const Header = () => {
  return (
    <header className={styles.header}>
      <Topbar />
      <div className={styles.container}>
        <h1 className={styles.paragraphText}>Project</h1>
      </div>
    </header>
  );
};

export default Header;
