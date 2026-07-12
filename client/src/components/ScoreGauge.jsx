import { motion } from "framer-motion";
import "./ScoreGauge.css";

/**
 * Circular gauge for a 0-100 score. Purely presentational.
 */
export default function ScoreGauge({ score = 0, label = "Score" }) {
  const clamped = Math.max(0, Math.min(100, Number(score) || 0));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const tone =
    clamped >= 70 ? "var(--accent-green)" :
    clamped >= 45 ? "var(--accent-amber)" :
    "var(--accent-red)";

  return (
    <div className="gauge">
      <svg width="132" height="132" viewBox="0 0 132 132">
        <circle
          cx="66" cy="66" r={radius}
          fill="none"
          stroke="var(--surface-strong)"
          strokeWidth="10"
        />
        <motion.circle
          cx="66" cy="66" r={radius}
          fill="none"
          stroke={tone}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          transform="rotate(-90 66 66)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 6px ${tone})` }}
        />
      </svg>
      <div className="gauge__center">
        <motion.span
          className="gauge__value"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {clamped}
        </motion.span>
        <span className="gauge__label">{label}</span>
      </div>
    </div>
  );
}
