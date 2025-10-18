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

// Register service worker for PWA (production only)
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(swUrl).catch(() => {
      // no-op: SW is optional
    });
  });
}
