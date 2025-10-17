import React, { useState, useEffect, useRef } from "react";
import { generateQuestion } from "../utils/questionGenerator";

export default function Quiz({ settings, onFinish }) {
  const [currentQ, setCurrentQ] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(settings.timer);

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Generate new question each time
  useEffect(() => {
    clearInterval(timerRef.current);
    const newQ = generateQuestion(settings.operations, settings.numbers);
    setCurrentQ(newQ);
    setFeedback("");
    setInput("");
    setTimeLeft(settings.timer);
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

  const handleTimeout = () => {
    if (!currentQ) return;
    setFeedback(`⏰ Temps écoulé ! Réponse : ${currentQ.answer}`);
    setTimeout(() => nextQuestion(false), 1000);
  };

  const handleAnswer = (answer) => {
    if (!currentQ || feedback) return;
    const correct = parseInt(answer) === currentQ.answer;
    setFeedback(correct ? "✅ Correct !" : `❌ Faux ! Réponse : ${currentQ.answer}`);
    nextQuestion(correct);
  };

  const nextQuestion = (wasCorrect) => {
    clearInterval(timerRef.current);
    setTimeout(() => {
      if (questionIndex >= settings.totalQuestions) {
        onFinish(score + (wasCorrect ? 1 : 0));
      } else {
        setQuestionIndex((q) => q + 1);
        setScore((s) => s + (wasCorrect ? 1 : 0));
      }
    }, 1000);
  };

  if (!currentQ) return null;

  return (
    <div className="card p-4 shadow-sm text-center">
      <h4>
        Question {questionIndex}/{settings.totalQuestions}
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
            Valider
          </button>
        </div>
      ) : (
        <div>
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              className="btn btn-outline-primary m-2"
              onClick={() => handleAnswer(opt)}
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
