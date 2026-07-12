import { motion } from "framer-motion";
import "./RiskList.css";

export default function RiskList({ risks = [] }) {
  if (!risks.length) return null;

  return (
    <section className="section-block">
      <div className="section-block__header">
        <span className="section-block__icon section-block__icon--risk" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </span>
        <h3 className="section-block__title">Risk Factors</h3>
      </div>
      <div className="risk-grid">
        {risks.map((risk, i) => (
          <motion.div
            key={i}
            className="risk-card glass-surface"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="risk-card__text">{risk}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
