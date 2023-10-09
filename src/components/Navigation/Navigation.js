import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.links}>
      <Link to="/about">
        <li>About</li>
      </Link>
      <li>Blog</li>
    </div>
  );
};

export default Navigation;
