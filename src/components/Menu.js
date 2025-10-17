import React, { useState } from "react";
import { useTranslation } from "../utils/i18n";
import ModalAlert from "./ModalAlert";

export default function Menu({ onStart }) {
  const [operations, setOperations] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [mode, setMode] = useState("multiple");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [timer, setTimer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const toggle = (item, list, setter) => {
    setter(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
    );
  };

  const handleSubmit = () => {
    if (operations.length && numbers.length) {
      onStart({ operations, numbers, mode, totalQuestions, timer });
    } else {
      setShowModal(true);
    }
  };

  // Helper arrays
  const allOps = ["+", "-", "×", "÷"];
  const allNums = [...Array(20).keys()].map((n) => n + 1);

  return (
    <div className="card p-4 shadow-sm">
      <h4>{t("selectOperations")}</h4>
      <div className="mb-3">
        <button
          className={`btn me-2 mb-2 ${
            operations.length === allOps.length
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setOperations(
              operations.length === allOps.length ? [] : allOps
            )
          }
        >
          {t("allOperations") || "Toutes"}
        </button>
        {allOps.map((op) => (
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

      <h4>{t("selectNumbers")}</h4>
      <div className="mb-3">
        <button
          className={`btn btn-sm me-1 mb-1 ${
            numbers.length === allNums.length
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setNumbers(numbers.length === allNums.length ? [] : allNums)
          }
        >
          {t("allNumbers") || "Tous"}
        </button>
        {allNums.map((n) => (
          <button
            key={n}
            className={`btn btn-sm me-1 mb-1 ${
              numbers.includes(n) ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => toggle(n, numbers, setNumbers)}
          >
            {n}
          </button>
        ))}
      </div>

      <h4>{t("mode")}</h4>
      <div className="mb-3">
        <button
          className={`btn me-2 ${
            mode === "multiple" ? "btn-info" : "btn-outline-info"
          }`}
          onClick={() => setMode("multiple")}
        >
          {t("multiple")}
        </button>
        <button
          className={`btn ${
            mode === "manual" ? "btn-info" : "btn-outline-info"
          }`}
          onClick={() => setMode("manual")}
        >
          {t("manual")}
        </button>
      </div>

      <h4>{t("numQuestions")}</h4>
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

      <h4>{t("timer")}</h4>
      <div className="mb-3">
        {[2, 5, 10, 30, "none"].map((tValue) => (
          <button
            key={tValue}
            className={`btn me-2 ${
              (tValue === "none" && timer === null) || timer === tValue
                ? "btn-secondary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setTimer(tValue === "none" ? null : tValue)}
          >
            {tValue === "none" ? (t("noTimer") || "Aucun") : `${tValue}s`}
          </button>
        ))}
      </div>

      <button className="btn btn-lg btn-success" onClick={handleSubmit}>
        {t("start")}
      </button>

      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        title={t("info")}
        message={t("selectWarning")}
      />
    </div>
  );
}
