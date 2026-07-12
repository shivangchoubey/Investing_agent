import { motion } from "framer-motion";
import "./MetricCard.css";

/**
 * Displays one financial metric. If the backend hasn't provided a value yet,
 * shows a clear placeholder instead of blank/undefined.
 */
export default function MetricCard({ icon, label, value, index = 0 }) {
  const hasValue = value !== undefined && value !== null && value !== "";

  return (
    <motion.div
      className="metric-card glass-surface"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="metric-card__icon" aria-hidden="true">{icon}</div>
      <div className="metric-card__body">
        <span className="metric-card__label">{label}</span>
        <span className={`metric-card__value ${hasValue ? "" : "metric-card__value--placeholder"}`}>
          {hasValue ? value : "Not available yet"}
        </span>
      </div>
    </motion.div>
  );
}
