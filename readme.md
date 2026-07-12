# 🚀 Veridion

> **AI-Powered Investment Research Platform**

Veridion is an AI-powered investment research platform that analyzes publicly listed companies using **Large Language Models (LLMs)**, **real-time financial data**, and **latest news** to generate structured investment insights.

Instead of manually reading financial reports and news articles, users simply enter a company name and receive an AI-generated investment report containing recommendations, strengths, risks, confidence score, and reasoning.

---

## 🌐 Live Demo

### Frontend
https://investing-agent-three.vercel.app/

### Backend API
https://investing-agent-82tj.onrender.com/

### GitHub Repository
https://github.com/shivangchoubey/Investing_agent

---

# 📸 Application Preview

> **AI Investment Research Dashboard**

- Search any public company
- AI-generated investment recommendation
- Investment score
- Confidence score
- Company overview
- Strength analysis
- Risk analysis
- Modern responsive dashboard

---

# ✨ Features

- 🤖 AI-powered investment analysis
- 📈 Real-time financial data integration
- 📰 Latest company news analysis
- 📊 Investment Score (0–100)
- 🎯 Confidence Score
- ✅ INVEST / PASS recommendation
- 💡 Company overview
- 💪 Strength analysis
- ⚠️ Risk analysis
- 🖥️ Responsive UI
- 🎨 Modern SaaS dashboard design
- ⚡ Fast API response

---

# 🏗️ Architecture

```text
                    React + Vite Frontend
                             │
                             │
                       Axios HTTP Request
                             │
                             ▼
                    Express.js Backend API
                             │
        ┌────────────────────┼─────────────────────┐
        │                    │                     │
        ▼                    ▼                     ▼
 Yahoo Finance API      GNews API          Groq + LangChain
        │                    │                     │
        └────────────────────┼─────────────────────┘
                             ▼
                    AI Investment Report
                             │
                             ▼
                     React Dashboard UI
```

---

# ⚙️ Tech Stack

## Frontend

- React.js
- Vite
- Axios
- Framer Motion
- CSS3

---

## Backend

- Node.js
- Express.js
- LangChain
- Groq LLM

---

## APIs

- Yahoo Finance API
- GNews API

---

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```text
Investing_agent
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🔄 Workflow

```text
User enters company name
            │
            ▼
React sends POST request
            │
            ▼
Express Backend
            │
            ├────────► Yahoo Finance
            │
            ├────────► GNews API
            │
            └────────► Groq LLM
                        │
                        ▼
             AI Investment Analysis
                        │
                        ▼
          Structured JSON Response
                        │
                        ▼
         Beautiful React Dashboard
```

---

# 📥 API Endpoint

## Analyze Company

### Request

```http
POST /api/analyse
```

### Request Body

```json
{
    "company":"Apple"
}
```

---

### Sample Response

```json
{
    "company": "Apple Inc.",
    "investmentScore": 85,
    "recommendation": "INVEST",
    "confidence": 90,
    "overview": "Apple Inc. is a leading technology company...",
    "strengths": [
        "Strong brand value",
        "High profitability",
        "Large ecosystem"
    ],
    "risks": [
        "Regulatory pressure",
        "Market competition",
        "Supply chain dependency"
    ],
    "reasoning": "Apple has strong fundamentals and long-term growth potential..."
}
```

---

# 💻 Local Installation

## Clone Repository

```bash
git clone https://github.com/shivangchoubey/Investing_agent.git
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** directory.

```env
GROQ_API_KEY=your_groq_api_key

GNEWS_API_KEY=your_gnews_api_key
```

---

# 🎯 Use Cases

- Research public companies
- Quick investment insights
- Educational purposes
- Financial analysis
- AI-assisted stock research

---

# 🚀 Future Improvements

- 📈 Interactive stock charts
- 📊 Historical financial analysis
- 📑 PDF report generation
- ⭐ Company watchlist
- 🔔 Price alerts
- 👤 User authentication
- 📂 Portfolio management
- 🤖 Multi-model AI support
- 🌍 Multi-language support
- 📱 Progressive Web App (PWA)

---

# 👨‍💻 Author

**Shivang Choubey**

B.Tech Computer Science Engineering

Lovely Professional University

GitHub: https://github.com/shivangchoubey

---

# ⭐ If you found this project interesting

Give the repository a ⭐ on GitHub.