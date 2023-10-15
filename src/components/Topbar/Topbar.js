import React from "react";
import { HouseSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import styles from "./Topbar.module.css";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <Link className={styles.topbarLayout} to="/">
        <HouseSimple size={24} weight="fill" />
        <Menu />
      </Link>
    </div>
  );
};

export default Topbar;
