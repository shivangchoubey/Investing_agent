import { motion } from "framer-motion";
import ScoreGauge from "./ScoreGauge";
import "./ResultCard.css";

const BADGE_STYLES = {
  INVEST: { className: "badge--invest", label: "Invest" },
  PASS: { className: "badge--avoid", label: "Pass" },
  HOLD: { className: "badge--hold", label: "Hold" },
  AVOID: { className: "badge--avoid", label: "Avoid" },
};

function RecommendationBadge({ recommendation }) {
  const meta = BADGE_STYLES[recommendation] ?? {
    className: "badge--hold",
    label: recommendation || "N/A",
  };
  return <span className={`badge ${meta.className}`}>{meta.label}</span>;
}

export default function ResultCard({ result, financials }) {
  const {
    company,
    investmentScore,
    recommendation,
    confidence,
    overview,
    reasoning,
  } = result;

  const symbol = financials?.symbol;

  return (
    <motion.section
      className="result-card glass-surface"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="result-card__header">
        <div className="result-card__heading">
          <h2 className="result-card__company">{financials?.company || company}</h2>
          <div className="result-card__subheading">
            <RecommendationBadge recommendation={recommendation} />
            {symbol && (
              <span className="result-card__ticker">{symbol}</span>
            )}
          </div>
        </div>

        <div className="result-card__gauges">
          <div className="result-card__confidence">
            <span className="result-card__confidence-label">Confidence</span>
            <span className="result-card__confidence-value">{confidence}% Reliable</span>
          </div>
          <ScoreGauge score={investmentScore} label="" />
        </div>
      </header>

      {overview && (
        <div className="result-card__block">
          <h3 className="result-card__block-title">Executive Summary</h3>
          <p className="result-card__block-text">{overview}</p>
        </div>
      )}

      {reasoning && (
        <div className="result-card__block">
          <h3 className="result-card__block-title">AI Reasoning</h3>
          <p className="result-card__block-text">{reasoning}</p>
        </div>
      )}
    </motion.section>
  );
}
