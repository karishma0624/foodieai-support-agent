# 🍽️ FoodieAI Support Agent

FoodieAI Support Agent is an AI-powered customer support system for a food ordering platform. It combines FastAPI, LangChain, Google Gemini, and Supabase Vector Database (pgvector) to provide intelligent customer support through Retrieval-Augmented Generation (RAG), tool calling, conversational memory, and voice-enabled interactions.

The application helps customers with order-related queries, company policies, menu recommendations, and personalized food quantity suggestions based on the occasion and group size.

---

## 🚀 Live Demo

### Frontend
https://foodieai-support-agent.vercel.app

### Backend API
https://foodieai-support-agent.onrender.com

---

## ✨ Features

- 🤖 AI-powered customer support using Google Gemini
- 📚 Retrieval-Augmented Generation (RAG)
- 🔎 Semantic search using Supabase pgvector
- 📦 Order status lookup
- ❌ Order cancellation
- 🎫 Support ticket creation
- 🍽️ AI-powered menu & quantity recommendations
- 🎤 Voice-to-text using Web Speech API
- 🔊 Text-to-speech responses
- 💬 Conversation memory using Supabase
- ⚡ FastAPI REST API
- 🎨 Responsive React + Tailwind frontend

---

## 🏗️ System Architecture

```
React + TypeScript + Tailwind
            │
            ▼
      FastAPI Backend
            │
      LangChain Agent
            │
 ┌──────────┴──────────┐
 │                     │
 ▼                     ▼
Google Gemini     Supabase
     LLM         PostgreSQL + pgvector
```

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Web Speech API

### Backend
- FastAPI
- LangChain
- Google Gemini 2.5 Flash

### Database
- Supabase PostgreSQL
- pgvector

### AI & RAG
- LangChain Tool Calling
- Gemini Embeddings
- Retrieval-Augmented Generation (RAG)

### Deployment
- Render (Backend)
- Vercel (Frontend)

---

## 📁 Project Structure

```
foodieai-support-agent/
│
├── foodieai-backend/
│   ├── agent/
│   ├── data/
│   ├── db/
│   ├── models/
│   ├── scripts/
│   ├── utils/
│   ├── main.py
│   └── requirements.txt
│
└── foodieai-frontend/
    ├── src/
    ├── components/
    ├── hooks/
    ├── lib/
    └── App.tsx
```

---

## 🤖 AI Agent Capabilities

The AI assistant can:

- Answer refund and cancellation policy questions
- Retrieve company FAQs using RAG
- Track customer orders
- Cancel eligible orders
- Create support tickets
- Recommend menu items
- Suggest food quantities based on:
  - Birthday parties
  - Family dinners
  - Office lunches
  - Romantic dinners
  - Large gatherings
- Handle natural conversations using conversational memory

---

## 💬 Example Queries

```
What is your refund policy?

Track my order ORD1256.

Cancel order ORD1257.

I'm hosting a birthday party for 12 people.
What should I order?

Suggest a vegetarian dinner for 6 people.

How can I apply a coupon?

What payment methods do you support?
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/karishma0624/foodieai-support-agent.git
cd foodieai-support-agent
```

### Backend

```bash
cd foodieai-backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd foodieai-frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

Backend (`foodieai-backend/.env`)

```env
GEMINI_API_KEY=

SUPABASE_URL=

SUPABASE_SERVICE_KEY=
```

Frontend (`foodieai-frontend/.env`)

```env
VITE_BACKEND_URL=https://foodieai-support-agent.onrender.com
```

---

## 📦 Deployment

Backend
- Render

Frontend
- Vercel

---

## 🚀 Future Enhancements

- Authentication
- Admin Dashboard
- Real-time order tracking
- WhatsApp integration
- Email notifications
- Multi-language support

---

## 👩‍💻 Author

**Karishma S K**

B.Tech Information Technology

AI & Full Stack Developer
