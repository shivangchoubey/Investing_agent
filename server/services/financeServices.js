import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  fetchOptions: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  },
  suppressNotices: ["yahooSurvey"],
});

export async function getCompanyFinancials(companyName) {
  try {
    let symbol = null;
    let companyLongName = companyName;
    let sector = null;
    let industry = null;

    const trimmed = companyName.trim();
    if (/^[A-Za-z]{1,5}(\.[A-Za-z]{1,2})?$/.test(trimmed)) {
      symbol = trimmed.toUpperCase();
    }

    // 1. Resolve ticker symbol & profile via search
    try {
      const search = await yahooFinance.search(trimmed);
      const validQuote =
        search?.quotes?.find((q) => q.symbol && q.isYahooFinance !== false) ||
        search?.quotes?.find((q) => q.symbol);

      if (validQuote?.symbol) {
        symbol = validQuote.symbol;
        companyLongName = validQuote.longname || validQuote.shortname || validQuote.name || companyLongName;
        sector = validQuote.sector || null;
        industry = validQuote.industry || null;
      }
    } catch (searchErr) {
      console.warn("Yahoo search failed, attempting direct search endpoint fallback:", searchErr.message);
      try {
        const resp = await fetch(
          `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(trimmed)}`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            },
          }
        );
        const data = await resp.json();
        const validQuote =
          data?.quotes?.find((q) => q.symbol && q.isYahooFinance !== false) ||
          data?.quotes?.find((q) => q.symbol);

        if (validQuote?.symbol) {
          symbol = validQuote.symbol;
          companyLongName = validQuote.longname || validQuote.shortname || companyLongName;
          sector = validQuote.sector || null;
          industry = validQuote.industry || null;
        }
      } catch (directSearchErr) {
        console.warn("Direct search fallback failed:", directSearchErr.message);
      }
    }

    if (!symbol) {
      symbol = trimmed.toUpperCase();
    }

    // 2. Try quoteSummary
    try {
      const summary = await yahooFinance.quoteSummary(symbol, {
        modules: ["price", "summaryProfile", "defaultKeyStatistics", "summaryDetail"],
      });

      if (summary?.price) {
        return {
          company: summary.price.longName || companyLongName,
          symbol,
          sector: summary.summaryProfile?.sector || sector,
          industry: summary.summaryProfile?.industry || industry,
          currentPrice: summary.price.regularMarketPrice,
          marketCap: summary.price.marketCap,
          currency: summary.price.currency || "USD",
          peRatio: summary.summaryDetail?.trailingPE || summary.defaultKeyStatistics?.trailingPE || null,
        };
      }
    } catch (summaryErr) {
      console.warn("quoteSummary failed, falling back to quote:", summaryErr.message);
    }

    // 3. Fallback: lighter yahooFinance.quote (does not require crumb)
    try {
      const quote = await yahooFinance.quote(symbol);
      if (quote && (quote.regularMarketPrice !== undefined || quote.postMarketPrice !== undefined)) {
        return {
          company: quote.longName || quote.shortName || companyLongName,
          symbol: quote.symbol || symbol,
          sector: sector,
          industry: industry,
          currentPrice: quote.regularMarketPrice ?? quote.postMarketPrice,
          marketCap: quote.marketCap ?? null,
          currency: quote.currency || "USD",
          peRatio: quote.trailingPE || quote.forwardPE || null,
        };
      }
    } catch (quoteErr) {
      console.warn("yahooFinance.quote failed, falling back to direct v8 chart API:", quoteErr.message);
    }

    // 4. Fallback: Direct Yahoo v8 chart API (pure fetch without cookies/crumbs)
    try {
      const chartRes = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          },
        }
      );
      const chartData = await chartRes.json();
      const meta = chartData?.chart?.result?.[0]?.meta;
      if (meta && meta.regularMarketPrice !== undefined) {
        return {
          company: meta.longName || meta.shortName || companyLongName,
          symbol: meta.symbol || symbol,
          sector: sector,
          industry: industry,
          currentPrice: meta.regularMarketPrice,
          marketCap: null,
          currency: meta.currency || "USD",
          peRatio: null,
        };
      }
    } catch (chartErr) {
      console.error("Direct v8 chart API fallback failed:", chartErr.message);
    }

    return null;
  } catch (err) {
    console.error("getCompanyFinancials error:", err);
    return null;
  }
}