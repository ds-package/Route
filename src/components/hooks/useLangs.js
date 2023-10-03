// LanguageContext.js
import React, { createContext, useState } from "react";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ko");

  const toggleLanguage = () => {
    const newLanguage = language === "ko" ? "en" : "ko";
    setLanguage(newLanguage);
    document.documentElement.lang = newLanguage; // Update HTML lang attribute
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };
