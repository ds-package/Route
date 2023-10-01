import React from "react";
import Footer from "../../components/Footer/Footer";
import styles from "./Layout.module.css"

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;