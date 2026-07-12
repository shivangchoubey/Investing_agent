import { getCompanyNews } from "../services/newServices.js";
import { getCompanyFinancials } from "../services/financeServices.js";
import { analyseCompany } from '../services/aiService.js';

export async function getInvestmentReport(req,res){
    try{
        const { company }=req.body;
        if(!company){
            return res.status(400).json({
                message:"The Comapny name is required",
            });
        }
        const financials = await getCompanyFinancials(company);

        if (!financials) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }
        const news = await getCompanyNews(company);

        const result = await analyseCompany(company, financials, news);        
        res.json({
                    success:true,
                    report:result,
                });
    }   catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:error.message,
            error
        });
    }
}