import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function App() {
  const [stage, setStage] = useState("menu");
  const [settings, setSettings] = useState({});
  const [score, setScore] = useState(0);

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

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setStage("result");
  };

  const backToMenu = () => {
    setStage("menu");
    setScore(0);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🧮 Les opérations mathématiques</h1>
      {stage === "menu" && <Menu onStart={startQuiz} />}
      {stage === "quiz" && <Quiz settings={settings} onFinish={finishQuiz} />}
      {stage === "result" && (
        <Result
          score={score}
          total={settings.totalQuestions}
          onRestart={backToMenu}
        />
      )}
    </div>
  );
}
