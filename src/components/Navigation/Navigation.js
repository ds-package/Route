import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Link to="/about" className={styles.link}>
        About
      </Link>
      <div className={styles.link}>·</div>
      <Link to="https://ds-package.github.io/Record/#/" target="_blank">
        Blog
      </Link>
    </div>
  );
};

export default Navigation;
