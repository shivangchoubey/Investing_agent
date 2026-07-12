import { useState } from "react";
import { motion } from "framer-motion";
import "./SearchBox.css";

/**
 * Controlled search input. Purely presentational — parent owns the
 * submit logic (calling the API), this only reports the typed value.
 */
export default function SearchBox({ onAnalyse, isLoading }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onAnalyse(trimmed);
  }

  return (
    <motion.form
      className="search-box glass-surface"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <span className="search-box__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>

      <input
        type="text"
        className="search-box__input"
        placeholder="Enter a company name — e.g. Apple, Tesla, Nvidia…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
        aria-label="Company name"
      />

      <button
        type="submit"
        className="search-box__button"
        disabled={isLoading || !value.trim()}
      >
        {isLoading ? "Analysing…" : "Analyse"}
      </button>
    </motion.form>
  );
}
