import { motion } from "framer-motion";
import "./NewsList.css";

export default function NewsList({ news = [] }) {
  const hasNews = Array.isArray(news) && news.length > 0;
  const items = hasNews ? news.slice(0, 4) : [];

  return (
    <section className="market-signals glass-surface">
      <div className="market-signals__header">
        <h3 className="market-signals__title">Market Signals</h3>
        <span className="market-signals__rss" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </span>
      </div>

      <div className="news-feed">
        {items.map((item, i) => (
          <motion.a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="news-feed__card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="news-feed__meta">
              <span className="news-feed__source">{item.source || "GNEWS"}</span>
              <span className="news-feed__time">Recent</span>
            </div>
            <h4 className="news-feed__title">{item.title}</h4>
            {item.description && <p className="news-feed__snippet">{item.description}</p>}
          </motion.a>
        ))}

        {!hasNews && (
          <div className="news-feed__empty">
            <span className="news-feed__empty-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            </span>
            <p className="news-feed__empty-text">No recent market signals found</p>
          </div>
        )}

        <div className="regulatory-card">
          <span className="regulatory-card__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </span>
          <span className="regulatory-card__text">Regulatory filing data: Not available yet</span>
        </div>
      </div>
    </section>
  );
}
