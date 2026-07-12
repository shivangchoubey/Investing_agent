import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loading.css";

const STEPS = [
  "Searching company…",
  "Fetching financial data…",
  "Reading latest news…",
  "Generating investment report…",
];

// Roughly how long each step "occupies" before the next lights up.
// The last step lingers until the real response actually arrives.
const STEP_DURATION_MS = 1600;

export default function Loading() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= STEPS.length - 1) return;
    const t = setTimeout(() => setActiveStep((s) => s + 1), STEP_DURATION_MS);
    return () => clearTimeout(t);
  }, [activeStep]);

  return (
    <motion.div
      className="thinking glass-surface"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      <div className="thinking__orb" aria-hidden="true">
        <span className="thinking__ring thinking__ring--a" />
        <span className="thinking__ring thinking__ring--b" />
        <span className="thinking__core" />
      </div>

      <ul className="thinking__steps">
        {STEPS.map((label, i) => {
          const state =
            i < activeStep ? "done" : i === activeStep ? "active" : "pending";
          return (
            <li key={label} className={`thinking__step thinking__step--${state}`}>
              <span className="thinking__marker">
                <AnimatePresence mode="wait" initial={false}>
                  {state === "done" ? (
                    <motion.svg
                      key="check"
                      width="12" height="12" viewBox="0 0 24 24" fill="none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <path d="M4 12.5L9.5 18L20 6" stroke="#06070c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  ) : (
                    <motion.span
                      key="dot"
                      className="thinking__dot"
                      initial={{ scale: 0.6, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                    />
                  )}
                </AnimatePresence>
              </span>
              <span className="thinking__label">{label}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
