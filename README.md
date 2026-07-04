# FoodieAI

FoodieAI is an intelligent, AI-powered food ordering platform that integrates a modern React frontend with a LangChain and FastAPI-powered AI agent backend. It allows users to browse a dynamic menu, view high-quality dishes, and interact with a smart AI assistant to help them choose their meals based on their preferences.

## 🚀 Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

**Backend:**
- FastAPI (Python)
- LangChain
- Google Gemini API (`gemini-2.5-flash`)
- FAISS (Vector Store for RAG)

## 📁 Project Structure

- `/foodieai-frontend`: The React UI application
- `/foodieai-backend`: The Python FastAPI backend containing the AI agent and RAG logic

## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd FoodieAI
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment:
```bash
cd foodieai-backend
python -m venv venv
```
Activate the virtual environment:
- Windows: `.\venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `foodieai-backend` directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the FastAPI server:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd foodieai-frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

## 🤖 AI Assistant Capabilities
The built-in FoodieAI agent uses a LangChain Retrieval-Augmented Generation (RAG) pipeline to understand the restaurant's menu context. You can ask it for:
- Recommendations (e.g., "What are your best vegetarian starters?")
- Spice levels and dietary restrictions
- Details about specific dishes

## 📝 License
MIT
