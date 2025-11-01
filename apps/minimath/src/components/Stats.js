import React, { useMemo } from "react";
import { useTranslation } from "../utils/i18n";

export default function Stats({ history = [] }) {
  const { t } = useTranslation();

  // Compute stats
  const breakdown = useMemo(() => {
    const byOperand = {};
    const avg = (arr) =>
      arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : "-";

    history.forEach((item) => {
      const match = item.q.match(/[\+\-\×÷]/);
      const op = match ? match[0] : "?";
      if (!byOperand[op]) byOperand[op] = { total: 0, correct: 0, times: [] };
      byOperand[op].total++;
      if (item.correct) byOperand[op].correct++;
      if (item.time) byOperand[op].times.push(parseFloat(item.time));
    });

    return Object.entries(byOperand).map(([op, s]) => ({
      op,
      acc: Math.round((s.correct / s.total) * 100),
      total: s.total,
      correct: s.correct,
      avg: avg(s.times),
    }));
  }, [history]);

  const getRowClass = (acc) => {
    if (acc >= 80) return "list-group-item list-group-item-success";
    if (acc >= 60) return "list-group-item list-group-item-warning";
    return "list-group-item list-group-item-danger";
  };

  const getOperandLabel = (symbol) => {
    switch (symbol) {
      case "+": return "➕";
      case "-": return "➖";
      case "×": return "✖️";
      case "÷": return "➗";
      default: return symbol;
    }
  };

  if (!breakdown.length)
    return (
      <div className="text-muted small">
        {t("noData") || "No data available"}
      </div>
    );

  return (
    <div className="mt-3 d-flex">
      <ul className="list-group w-auto flex-grow-1">
        {breakdown.map((item, idx) => (
          <li
            key={idx}
            className={`list-group-item d-flex text-center ${getRowClass(item.acc)}`}
          >
            <div className="col fw-semibold">{getOperandLabel(item.op)}</div>
            <div className="col">{item.correct}/{item.total}</div>
            <div className="col">{item.acc}%</div>
            <div className="col text-muted small">{item.avg !== "-" ? `${item.avg}s` : "-"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
