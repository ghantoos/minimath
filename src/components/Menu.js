import React, { useState } from "react";
import { useTranslation } from "../utils/i18n";
import ModalAlert from "../utils/alert";

export default function Menu({ onStart }) {
  const [operations, setOperations] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [mode, setMode] = useState("multiple");
  const [formats, setFormats] = useState(["x+y=?"]);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [timer, setTimer] = useState(30);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const toggle = (item, list, setter, defaultVal = []) => {
    const updated = list.includes(item)
      ? list.filter((x) => x !== item)
      : [...list, item];
    setter(updated.length ? updated : defaultVal);
  };

  const handleSubmit = () => {
    if (operations.length && numbers.length) {
      onStart({ operations, numbers, mode, totalQuestions, timer, formats });
    } else setShowModal(true);
  };

  const allOps = ["+", "-", "×", "÷"];
  const allNums = [...Array(20).keys()].map((n) => n + 1);
  const allFormats = [
    { key: "x+y=?", label: "1️⃣ + 2️⃣ = ❓" },
    { key: "x+?=y", label: "1️⃣ + ❓ = 2️⃣" },
    { key: "?+x=y", label: "❓ + 1️⃣ = 2️⃣" },
  ];

  return (
    <div className="card p-4 shadow-sm">
      <h5>{t("selectOperations")}</h5>
      <div className="mb-3">
        <button
          className={`btn me-2 mb-2 ${operations.length === allOps.length ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setOperations(operations.length === allOps.length ? [] : allOps)}
        >
          {t("allOperations") || "Toutes"}
        </button>
        {allOps.map((op) => (
          <button
            key={op}
            className={`btn me-2 mb-2 ${operations.includes(op) ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => toggle(op, operations, setOperations)}
          >
            {op}
          </button>
        ))}
      </div>

      <h5>{t("selectNumbers")}</h5>
      <div className="mb-3">
        <button
          className={`btn me-1 mb-1 ${numbers.length === allNums.length ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setNumbers(numbers.length === allNums.length ? [] : allNums)}
        >
          {t("allNumbers") || "Tous"}
        </button>
        {allNums.map((n) => (
          <button
            key={n}
            className={`btn me-1 mb-1 ${numbers.includes(n) ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => toggle(n, numbers, setNumbers)}
          >
            {n}
          </button>
        ))}
      </div>

      <h5>{t("mode")}</h5>
      <div className="mb-3">
        <button
          className={`btn me-2 ${mode === "multiple" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setMode(mode === "multiple" ? "manual" : "multiple")}
        >
          {t("multiple")}
        </button>
        <button
          className={`btn ${mode === "manual" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setMode(mode === "manual" ? "multiple" : "manual")}
        >
          {t("manual")}
        </button>
      </div>

      <h5>{t("numQuestions")}</h5>
      <div className="mb-3">
        {[10, 20, 30, 50].map((n) => (
          <button
            key={n}
            className={`btn me-2 ${totalQuestions === n ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setTotalQuestions(totalQuestions === n ? 10 : n)}
          >
            {n}
          </button>
        ))}
      </div>

      <h5>{t("timer")}</h5>
      <div className="mb-3">
        {["none", 30, 10, 5, 2].map((tValue) => (
          <button
            key={tValue}
            className={`btn me-2 ${
              (tValue === "none" && timer === null) || timer === tValue
                ? "btn-warning"
                : "btn-outline-warning"
            }`}
            onClick={() => setTimer(timer === tValue || (tValue === "none" && timer === null) ? 30 : tValue === "none" ? null : tValue)}
          >
            {tValue === "none" ? (t("noTimer") || "Aucun") : `${tValue}s`}
          </button>
        ))}
      </div>

      <h5>{t("advancedFormat")}</h5>
      <div className="mb-3">
        <button
          className={`btn me-2 mb-2 ${
            formats.length === allFormats.length ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() =>
            setFormats(
              formats.length === allFormats.length
                ? ["x+y=?"]  // ⬅️ revert to default when unselecting "All"
                : allFormats.map(f => f.key)
            )
          }
        >
          {t("allFormats") || "All"}
        </button>

        {allFormats.map((f) => (
          <button
            key={f.key}
            className={`btn me-2 mb-2 ${
              formats.includes(f.key) ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={() => toggle(f.key, formats, setFormats, ["x+y=?"])}
            style={{ fontSize: "1.1rem" }} // 🔹 slightly larger, emoji-friendly
          >
            {f.label}
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
