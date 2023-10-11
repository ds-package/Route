import React from "react";
import { HouseSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import styles from "./Topbar.module.css";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <Link to="/">
        <HouseSimple size={24} weight="fill" />
      </Link>
    </div>
  );
};

export default Topbar;
