import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    title: "Minimath",
    selectOperations: "Select one or more operations",
    selectNumbers: "Select one or more numbers (1–20)",
    mode: "Mode",
    manual: "Manual input",
    multiple: "Multiple choice",
    numQuestions: "Number of questions",
    timer: "Time per question",
    noTimer: "None",
    start: "Start quiz",
    question: "Question",
    validate: "Validate",
    correct: "✅ Correct!",
    wrong: "❌ Wrong! Answer:",
    timeUp: "⏰ Time’s up!",
    finished: "🎉 Quiz finished!",
    score: "You got {score} out of {total} correct.",
    backToMenu: "Back to menu",
    resultExcellent: "Congratulations!!! 🎉🎉",
    resultGood: "Well done! 👍",
    resultWork: "Keep practicing 💪",
    selectWarning: "Please select at least one operation and one number!",
    info: "Information",
    allOperations: "All",
    allNumbers: "All",
    summary: "Responses summary",
    answered: "Answered",
    resultsAnalysis: "Results analysis",
  },
  fr: {
    title: "Minimath",
    selectOperations: "Sélectionnez une ou plusieurs opérations",
    selectNumbers: "Sélectionnez un ou plusieurs nombres (1–20)",
    mode: "Mode",
    manual: "Réponse libre",
    multiple: "Choix multiple",
    numQuestions: "Nombre de questions",
    timer: "⏱Temps par question",
    noTimer: "Aucun",
    start: "Commencer le quiz",
    question: "Question",
    validate: "Valider",
    correct: "✅ Correct !",
    wrong: "❌ Faux ! Réponse :",
    timeUp: "⏰ Temps écoulé !",
    finished: "🎯 Résultat du quiz",
    score: "Vous avez {score} bonnes réponses sur {total}.",
    backToMenu: "Retour au menu",
    resultExcellent: "Félicitations !!! 🎉🎉",
    resultGood: "Bien joué ! 👍",
    resultWork: "Continue à pratiquer 💪",
    selectWarning: "Veuillez sélectionner au moins une opération et un nombre !",
    info: "Information",
    allOperations: "Toutes",
    allNumbers: "Tous",
    summary: "Résumé des réponses",
    answered: "Répondu",
    resultsAnalysis: "Analyse des résultats",
  },
};

// --- Context setup ---
const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
  const [lang, setLang] = useState(localStorage.getItem("lang") || browserLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key, params = {}) => {
    let text = translations[lang][key] || key;
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    return text;
  };

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
