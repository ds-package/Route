import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.menu}>
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

export default Menu;
