import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TranslationProvider } from "./utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TranslationProvider>
    <App />
  </TranslationProvider>
);
