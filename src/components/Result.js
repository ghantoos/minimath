import React, { useEffect } from "react";
import { launchFireworks } from "../utils/fireworks";
import { useTranslation } from "../utils/i18n";
import Stats from "../components/Stats";

export default function Result({ score, total, onRestart, history = [] }) {
  const { t } = useTranslation();

  const percentage = Math.round((score / total) * 100);
  let badgeClass = "bg-warning text-dark";
  let message = t("resultWork") || "À retravailler 💪";

  if (percentage === 100) {
    badgeClass = "bg-success";
    message = t("resultExcellent") || "Excellent ! 🎉";
  } else if (percentage >= 60 && percentage < 80) {
    badgeClass = "bg-info text-dark";
    message = t("resultGreat") || "Bravo ! 👍";
  } else if (percentage >= 60) {
    badgeClass = "bg-warning text-dark";
    message = t("resultGood") || "Bien joué ! 👍";
  }

  // 🎆 Trigger fireworks if perfect score
  useEffect(() => {
    if (percentage === 100) {
      launchFireworks(total);
    }
  }, [percentage]);

  // 🧩 Helper: rebuild expression text (for safety)
  const renderQuestion = (item) => {
    // Prefer stored text if available
    if (item.q && item.q.includes("?")) {
      return item.q.replace(
        "?",
        `<strong class="${
          item.correct ? "text-success" : "text-danger"
        }">${item.right}</strong>`
      );
    }

    // Otherwise rebuild from data array: [X, Y, Z, op, hiddenIndex]
    if (item.data && Array.isArray(item.data)) {
      const [X, Y, Z, op, hidden] = item.data;
      const a = hidden === 1 ? "?" : X;
      const b = hidden === 2 ? "?" : Y;
      const c = hidden === 3 ? "?" : Z;
      return `${a} ${op} ${b} = ${c}`.replace(
        "?",
        `<strong class="${
          item.correct ? "text-success" : "text-danger"
        }">${item.right}</strong>`
      );
    }

    // fallback
    return item.q || "";
  };

  return (
    <div className="card p-4 text-center shadow-sm">
      <h2>
        {t("finished") || "🎯 Résultat du quiz"}: {percentage}%
      </h2>
      <h4 className="my-3">
        {t("score", { score, total, plural: score > 1 ? "s" : "" })}
      </h4>

      <span className={`badge fs-5 px-3 py-2 ${badgeClass}`}>{message}</span>

      {/* 🧮 Results analysis */}
      {history.length > 0 && (
        <div className="mt-4 text-start">
          <h5>{t("summary") || "Résumé"}</h5>
          <ul className="list-group">
            {history.map((item, i) => (
              <li
                key={i}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  item.correct
                    ? "list-group-item-success"
                    : "list-group-item-danger"
                }`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      renderQuestion(item) +
                      (!item.correct && item.user !== null
                        ? ` <span>(${t("answered") || "Répondu"}: ${item.user})</span>`
                        : ""),
                  }}
                />
                <span className="text-muted small">{item.time}s</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 mb-4">
            <h5>{t("resultsAnalysis") || "📊 Analyse des résultats"}</h5>
            <Stats history={history} />
          </div>
        </div>
      )}

      <div className="mt-4">
        <button className="btn btn-lg btn-success" onClick={onRestart}>
          {t("backToMenu") || "Retour au menu"}
        </button>
      </div>
    </div>
  );
}
