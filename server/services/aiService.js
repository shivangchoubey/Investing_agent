import { ChatGroq } from "@langchain/groq";
let model;

function getModel() {
    if (!model) {
        model = new ChatGroq({
            model: 'llama-3.3-70b-versatile',
            apiKey: process.env.GROQ_API_KEY,
        });
    }
    return model;
}

export async function analyseCompany(companyName, financials, news) {
    const prompt = `
You are a senior equity research analyst.

Analyze the following company.

Company Name:
${companyName}

Financial Data:
${JSON.stringify(financials, null, 2)}

Recent News:
${JSON.stringify(news, null, 2)}

Instructions:
- Consider BOTH the financial data and the recent news.
- Mention if the recent news affects the investment decision.
- If the news appears unrelated to the company, ignore it.
- Return ONLY valid JSON.

Rules:
- investmentScore must be an integer between 0 and 100.
- confidence must be an integer between 0 and 100.
- recommendation must be only "INVEST" or "PASS".

Return exactly:

{
  "company":"",
  "investmentScore":85,
  "recommendation":"INVEST",
  "confidence":90,
  "overview":"",
  "strengths":[],
  "risks":[],
  "reasoning":""
}
`;
    const response = await getModel().invoke(prompt);
    let text = response.content;
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    const json=JSON.parse(text);
    if (json.investmentScore <= 1) {
    json.investmentScore *= 100;
    }

    if (json.confidence <= 1) {
        json.confidence *= 100;
    }

    json.investmentScore = Math.round(json.investmentScore);
    json.confidence = Math.round(json.confidence);
    return json;
}