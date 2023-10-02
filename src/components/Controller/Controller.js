import React, { useContext } from "react";
import { useTheme } from "../hooks/useTheme";
import { LanguageContext } from "../hooks/useLangs";
import { Sun, Moon } from "@phosphor-icons/react";
import styles from "./Controller.module.css";

const Controller = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useTheme();
  const body = window.document.body;

  setTimeout(() => {
    body.classList.add("theme-transition");
  }, 1000);

  return (
    <div className={styles.control}>
      <button className={styles.controlLang} onClick={() => toggleLanguage()}>
        {language === "en" ? "Ko" : "En"}
      </button>

      <button className={styles.controlTheme}>
        {theme === "theme-light" ? (
          <Moon
            size={20}
            weight="fill"
            className="themeToggle"
            onClick={() => setTheme("theme-dark")}
          ></Moon>
        ) : (
          <Sun
            size={20}
            weight="fill"
            className="themeToggle"
            onClick={() => setTheme("theme-light")}
          ></Sun>
        )}
      </button>
    </div>
  );
};

export default Controller;
