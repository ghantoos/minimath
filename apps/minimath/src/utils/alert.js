import React from "react";
import { useTranslation } from "./i18n";

export default function ModalAlert({ show, title, message, onClose }) {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-secondary">
            <h5 className="modal-title text-white">
              {title || t("info") || "⚠️ Info"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            {message ||
              t("selectWarning") ||
              "Veuillez sélectionner au moins une opération et un nombre !"}
          </div>
          <div className="modal-footer">
            <button className="btn btn-warning" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
