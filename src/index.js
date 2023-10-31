import React from "react";
import ReactDOM from "react-dom/client";
import ThemeContextProvider from "./components/hooks/useTheme";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <HelmetProvider context={{}}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </ThemeContextProvider>
);
