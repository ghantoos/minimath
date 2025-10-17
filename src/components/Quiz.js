import React, { useState, useEffect, useRef } from "react";
import { generateQuestion } from "../utils/questionGenerator";
import { useTranslation } from "../utils/i18n";

export default function Quiz({ settings, onFinish }) {
  const [currentQ, setCurrentQ] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(settings.timer);
  const [history, setHistory] = useState([]);
  const [questionStart, setQuestionStart] = useState(Date.now());

  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  // Generate new question each time
  useEffect(() => {
    clearInterval(timerRef.current);
    const newQ = generateQuestion(settings.operations, settings.numbers);
    setCurrentQ(newQ);
    setFeedback("");
    setInput("");
    setTimeLeft(settings.timer);
    setQuestionStart(Date.now());
  }, [questionIndex]);

  // Focus the input whenever a new question appears
  useEffect(() => {
    if (settings.mode === "manual" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQ]);

  // Timer logic
  useEffect(() => {
    if (!settings.timer || !currentQ || feedback) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t && t > 1) return t - 1;
        clearInterval(timerRef.current);
        handleTimeout();
        return 0;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, feedback]);

  const handleAnswer = (answer) => {
    if (!currentQ || feedback) return;
    const correct = parseInt(answer) === currentQ.answer;
    const duration = ((Date.now() - questionStart) / 1000).toFixed(1);
    setFeedback(correct ? t("correct") : `${t("wrong")} ${currentQ.answer}`);
    setHistory((h) => [
      ...h,
      {
        q: currentQ.qText,
        correct,
        user: parseInt(answer),
        right: currentQ.answer,
        time: duration,
      },
    ]);
    nextQuestion(correct);
  };

  const handleTimeout = () => {
    if (!currentQ) return;
    setFeedback(`⏰ ${t("timeUp") || "Temps écoulé !"} ${t("wrong")} ${currentQ.answer}`);
    const duration = ((Date.now() - questionStart) / 1000).toFixed(1);
    setHistory((h) => [
      ...h,
      {
        q: currentQ.qText,
        correct: false,
        user: null,
        right: currentQ.answer,
        time: duration,
      },
    ]);
    setTimeout(() => nextQuestion(false), 1000);
  };

  const nextQuestion = (wasCorrect) => {
    clearInterval(timerRef.current);
    setTimeout(() => {
      setScore((s) => s + (wasCorrect ? 1 : 0));
      setHistory((h) => {
        const updated = [...h];
        if (questionIndex >= settings.totalQuestions) {
          onFinish(score + (wasCorrect ? 1 : 0), updated);
        } else {
          setQuestionIndex((q) => q + 1);
        }
        return updated;
      });
    }, 1000);
  };


  if (!currentQ) return null;

  return (
    <div className="card p-4 shadow-sm text-center">
      <h4>
        {t("question")} {questionIndex}/{settings.totalQuestions}
      </h4>

      {settings.timer && (
        <div className="mb-3">
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-info"
              style={{
                width: `${(timeLeft / settings.timer) * 100}%`,
                transition: "width 1s linear",
              }}
            ></div>
          </div>
        </div>
      )}

      <h3 className="my-4">{currentQ.qText}</h3>

      {settings.mode === "manual" ? (
        <div>
          <input
            ref={inputRef}
            type="number"
            value={input}
            className="form-control w-50 mx-auto mb-3"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnswer(input)}
          />
          <button className="btn btn-primary" onClick={() => handleAnswer(input)}>
            {t("validate") || "Valider"}
          </button>
        </div>
      ) : (
        <div>
          {currentQ.options.map((opt, i) => (
            <button
              key={`${currentQ.qText}-${i}`}
              className="btn btn-outline-primary m-2"
              onClick={(e) => {
                e.currentTarget.blur();
                handleAnswer(opt);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3">
        <strong>{feedback}</strong>
      </div>
    </div>
  );
}
