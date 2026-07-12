import { motion } from "framer-motion";
import "./StrengthList.css";

export default function StrengthList({ strengths = [] }) {
  if (!strengths.length) return null;

  return (
    <section className="section-block">
      <div className="section-block__header">
        <span className="section-block__icon section-block__icon--strength" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <h3 className="section-block__title">Key Strengths</h3>
      </div>
      <div className="strength-grid">
        {strengths.map((strength, i) => (
          <motion.div
            key={i}
            className="strength-card glass-surface"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="strength-card__text">{strength}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
