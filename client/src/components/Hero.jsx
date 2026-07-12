import { motion } from "framer-motion";
import SearchBox from "./SearchBox";
import "./Hero.css";

export default function Hero({ onAnalyse, isLoading }) {
  return (
    <section className="hero">
      <motion.p
        className="hero__eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI-powered equity research
      </motion.p>

      <motion.h1
        className="hero__title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        AI Investment Research Agent
      </motion.h1>

      <motion.p
        className="hero__subtitle"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Type any public company and get an instant, data-driven investment
        read — score, confidence, strengths, risks and reasoning in seconds.
      </motion.p>

      <SearchBox onAnalyse={onAnalyse} isLoading={isLoading} />
    </section>
  );
}
