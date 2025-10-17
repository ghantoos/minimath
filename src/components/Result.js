import React, { useEffect } from "react";
import { launchFireworks } from "../utils/fireworks";

export default function Result({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);
  let badgeClass = "bg-danger";
  let message = "À retravailler 💪";

  if (percentage >= 80) {
    badgeClass = "bg-success";
    message = "Excellent ! 🎉";
  } else if (percentage >= 60) {
    badgeClass = "bg-warning text-dark";
    message = "Bien joué ! 👍";
  }

  // 🎆 Trigger fireworks if perfect score
  useEffect(() => {
    if (percentage === 100) {
      launchFireworks();
    }
  }, [percentage]);

  return (
    <div className="card p-4 text-center shadow-sm">
      <h2>🎯 Résultat du quiz</h2>
      <h4 className="my-3">
        Vous avez {score} bonnes réponses sur {total} ({percentage}%)
      </h4>

      <span className={`badge fs-5 px-3 py-2 ${badgeClass}`}>{message}</span>

      <div className="mt-4">
        <button className="btn btn-lg btn-success" onClick={onRestart}>
          Retour au menu
        </button>
      </div>
    </div>
  );
}
