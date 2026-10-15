import { getCompanyNews } from "../services/newServices.js";
import { getCompanyFinancials } from "../services/financeServices.js";
import { analyseCompany } from '../services/aiService.js';

export async function getInvestmentReport(req,res){
    try{
        const { company } = req.body;
        if (!company) {
            return res.status(400).json({
                message: "The Company name is required",
            });
        }
        const financials = await getCompanyFinancials(company);

        if (!financials) {
            return res.status(404).json({
                success: false,
                message: `Could not find stock or financial data for "${company}". Please verify the name or try ticker symbol (e.g., AAPL, MSFT, TSLA).`
            });
        }
        const news = await getCompanyNews(company);

        const result = await analyseCompany(company, financials, news);        
        res.json({
            success: true,
            report: result,
            financials,
            news,
        });
    } catch (error) {
        console.error("aiController error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error during analysis",
        });
    }
}