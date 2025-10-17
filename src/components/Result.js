import React, { useEffect } from "react";
import { launchFireworks } from "../utils/fireworks";
import { useTranslation } from "../utils/i18n";

export default function Result({ score, total, onRestart, history = [] }) {
  const { t } = useTranslation();

  const percentage = Math.round((score / total) * 100);
  let badgeClass = "bg-danger";
  let message = t("resultWork") || "À retravailler 💪";

  if (percentage >= 80) {
    badgeClass = "bg-success";
    message = t("resultExcellent") || "Excellent ! 🎉";
  } else if (percentage >= 60) {
    badgeClass = "bg-warning text-dark";
    message = t("resultGood") || "Bien joué ! 👍";
  }

  // 🎆 Trigger fireworks if perfect score
  useEffect(() => {
    if (percentage === 100) {
      launchFireworks();
    }
  }, [percentage]);

  return (
    <div className="card p-4 text-center shadow-sm">
      <h2>
        {t("finished") || "🎯 Résultat du quiz"}: {percentage}%
      </h2>
      <h4 className="my-3">{t("score", { score, total })}</h4>

      <span className={`badge fs-5 px-3 py-2 ${badgeClass}`}>{message}</span>

      {/* 🧮 Summary of all questions */}
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
                <span>
                  {item.q.replace("= ?", `= ${item.right}`)}{" "}
                  {!item.correct && item.user !== null && (
                    <span>
                      ({t("answered") || "Répondu"}: {item.user} ❌)
                    </span>
                  )}
                </span>
                <span className="text-muted small">{item.time}s</span>
              </li>
            ))}
          </ul>
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
