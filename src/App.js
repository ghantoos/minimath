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

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{t("title")}</h1>
        <select
          className="form-select w-auto"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>

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
  );
}
