import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link to="/blog">Blog</Link>
      <div className={styles.link}> · </div>
      <Link to="/about" className={styles.link}>
        About
      </Link>
    </div>
  );
};

export default Menu;
