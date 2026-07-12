import { useState } from "react";
import api from "../services/api";

import Hero from "../components/Hero";
import Loading from "../components/Loading";
import ResultCard from "../components/ResultCard";
import StrengthList from "../components/StrengthList";
import RiskList from "../components/RiskList";
import NewsList from "../components/NewsList";

import "./Home.css";

function formatMarketCap(num) {
  if (!num) return "N/A";
  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num}`;
}

function formatPrice(price, currency) {
  if (!price) return "N/A";
  const symbol = currency === "USD" ? "$" : currency || "$";
  return `${symbol}${Number(price).toFixed(2)}`;
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const handleAnalyse = async (company) => {
    try {
      setLoading(true);
      setError(null);
      setReport(null);
      setFinancials(null);
      setNews([]);

      const res = await api.post("/api/analyse", {
        company,
      });

      setReport(res.data.report);
      setFinancials(res.data.financials);
      setNews(res.data.news || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <header className="app-header">
        <div className="app-header__logo-container">
          <div className="app-header__logo">Veridion <span className="app-header__logo-ai">AI</span></div>
          <span className="app-header__tagline">Research, Reason, Invest</span>
        </div>
        <div className="app-header__actions">
          <button className="app-header__btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="app-header__btn" aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <div className="app-header__avatar">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80" alt="User Profile" />
          </div>
        </div>
      </header>

      <Hero
        onAnalyse={handleAnalyse}
        isLoading={loading}
      />

      {loading && (
        <div className="home__content">
          <Loading />
        </div>
      )}

      {error && (
        <div className="home__content">
          <div className="home__error glass-surface">
            {error}
          </div>
        </div>
      )}

      {report && (
        <div className="home__content home__content--dashboard">
          <div className="dashboard-grid">
            <div className="dashboard-grid__left">
              <ResultCard result={report} financials={financials} />
              
              {financials && (
                <div className="metrics-row">
                  <div className="metric-item glass-surface">
                    <span className="metric-item__icon metric-item__icon--price" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </span>
                    <div className="metric-item__content">
                      <span className="metric-item__label">Price</span>
                      <span className="metric-item__value">{formatPrice(financials.currentPrice, financials.currency)}</span>
                    </div>
                  </div>

                  <div className="metric-item glass-surface">
                    <span className="metric-item__icon metric-item__icon--market-cap" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                      </svg>
                    </span>
                    <div className="metric-item__content">
                      <span className="metric-item__label">Market Cap</span>
                      <span className="metric-item__value">{formatMarketCap(financials.marketCap)}</span>
                    </div>
                  </div>

                  <div className="metric-item glass-surface">
                    <span className="metric-item__icon metric-item__icon--pe-ratio" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </span>
                    <div className="metric-item__content">
                      <span className="metric-item__label">P/E Ratio</span>
                      <span className="metric-item__value">{financials.peRatio ? Number(financials.peRatio).toFixed(1) : "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="dashboard-grid__row">
                <StrengthList strengths={report.strengths} />
                <RiskList risks={report.risks} />
              </div>
            </div>

            <div className="dashboard-grid__right">
              <NewsList news={news} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;