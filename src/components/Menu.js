import React, { useState } from "react";

export default function Menu({ onStart }) {
  const [operations, setOperations] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [mode, setMode] = useState("manual");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [timer, setTimer] = useState(null);


  const toggle = (item, list, setter) => {
    setter(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
    );
  };

  const handleSubmit = () => {
    if (operations.length && numbers.length) {
      onStart({ operations, numbers, mode, totalQuestions, timer });
    } else {
      alert("Veuillez sélectionner au moins une opération et un nombre !");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Sélectionnez une ou plusieurs opérations</h4>
      <div className="mb-3">
        {["+", "-", "×", "÷"].map((op) => (
          <button
            key={op}
            className={`btn me-2 mb-2 ${
              operations.includes(op) ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => toggle(op, operations, setOperations)}
          >
            {op}
          </button>
        ))}
      </div>

      <h4>Sélectionnez un ou plusieurs nombres (1–20)</h4>
      <div className="mb-3">
        {[...Array(20).keys()].map((n) => (
          <button
            key={n + 1}
            className={`btn btn-sm me-1 mb-1 ${
              numbers.includes(n + 1)
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => toggle(n + 1, numbers, setNumbers)}
          >
            {n + 1}
          </button>
        ))}
      </div>

      <h4>Mode</h4>
      <div className="mb-3">
        <button
          className={`btn me-2 ${
            mode === "manual" ? "btn-info" : "btn-outline-info"
          }`}
          onClick={() => setMode("manual")}
        >
          Saisie manuelle
        </button>
        <button
          className={`btn ${
            mode === "multiple" ? "btn-info" : "btn-outline-info"
          }`}
          onClick={() => setMode("multiple")}
        >
          Choix multiple
        </button>
      </div>

      <h4>Nombre de questions</h4>
      <div className="mb-3">
        {[5, 10, 20, 30, 50].map((n) => (
          <button
            key={n}
            className={`btn me-2 ${
              totalQuestions === n ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={() => setTotalQuestions(n)}
          >
            {n}
          </button>
        ))}
      </div>

        <h4>⏱️ Temps par question</h4>
        <div className="mb-3">
        {[2, 5, 10, 30, "none"].map((t) => (
            <button
            key={t}
            className={`btn me-2 ${
                (t === "none" && timer === null) || timer === t
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setTimer(t === "none" ? null : t)}
            >
            {t === "none" ? "Aucun" : `${t}s`}
            </button>
        ))}
        </div>


      <button className="btn btn-lg btn-success" onClick={handleSubmit}>
        Commencer le quiz
      </button>
    </div>
  );
}
