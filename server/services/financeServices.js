import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getCompanyFinancials(companyName) {
  try {
    const search = await yahooFinance.search(companyName);

    if (!search.quotes || search.quotes.length === 0) {
      return null;
    }

    const symbol = search.quotes[0].symbol;

const summary = await yahooFinance.quoteSummary(symbol, {
  modules: ["price", "summaryProfile", "defaultKeyStatistics"],
});
    return {
  company: summary.price.longName,
  symbol,
  sector: summary.summaryProfile?.sector,
  industry: summary.summaryProfile?.industry,
  currentPrice: summary.price.regularMarketPrice,
  marketCap: summary.price.marketCap,
  currency: summary.price.currency,
  peRatio: summary.defaultKeyStatistics?.trailingPE
};
  } catch (err) {
    console.error(err);
    return null;
  }
}