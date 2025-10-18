import React, { useState, useEffect } from "react";
import { useTranslation } from "./utils/i18n";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function App() {
  const [stage, setStage] = useState("menu");
  const [settings, setSettings] = useState({});
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const { t, lang, setLang } = useTranslation();

  // ⚠️ Warn user before refreshing or closing during quiz
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (stage === "quiz") {
        e.preventDefault();
        e.returnValue = ""; // shows default browser warning
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [stage]);

  const startQuiz = (config) => {
    setSettings(config);
    setStage("quiz");
  };

  const finishQuiz = (finalScore, allHistory = []) => {
    setScore(finalScore);
    setHistory(allHistory);
    setStage("result");
  };

  const backToMenu = () => {
    setStage("menu");
    setScore(0);
  };

  const currentYear = Math.max(new Date().getFullYear(), 2025);

  return (
    <div className="container py-4 d-flex flex-column min-vh-100">
      <div className="d-flex align-items-center mb-4">
        <img
          src="icons/icon-192.png"
          alt="MiniMath icon"
          style={{ height: "2em", marginRight: "0.5em" }}
        />
        <select
          className="form-select d-inline-block w-auto fs-5 py-1 px-2 pe-5"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="fr">{t("title")} [Français]</option>
          <option value="en">{t("title")} [English]</option>
        </select>
      </div>

      <div className="flex-grow-1">
        {stage === "menu" && <Menu onStart={startQuiz} />}
        {stage === "quiz" && <Quiz settings={settings} onFinish={finishQuiz} />}
        {stage === "result" && (
          <Result
            score={score}
            total={settings.totalQuestions}
            history={history}
            onRestart={backToMenu}
          />
        )}
      </div>

      {/* 🧾 Footer */}
      <footer className="text-center text-muted small mt-4 mb-2">
        © {currentYear} Ignace Mouzannar
      </footer>
    </div>
  );
}
