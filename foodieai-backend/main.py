from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import ChatRequest, ChatResponse, CreateOrderRequest
import random
from agent.memory import load_recent_messages, save_message
from agent.agent import run_agent
from db.supabase_client import supabase
from utils.logger import logger
import uvicorn

app = FastAPI(title="FoodieAI Support API")

# Setup CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/orders/{order_number}")
def get_order_endpoint(order_number: str):
    """Debug endpoint to check order status directly."""
    try:
        response = supabase.table("orders").select("*").eq("order_number", order_number).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Order not found")
        return response.data[0]
    except Exception as e:
        logger.error(f"Error fetching order {order_number}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tickets")
def get_tickets_endpoint():
    """Debug endpoint to list all support tickets."""
    try:
        response = supabase.table("support_tickets").select("*").execute()
        return {"tickets": response.data}
    except Exception as e:
        logger.error(f"Error fetching tickets: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    logger.info(f"--- New Chat Request | Session: {request.session_id} ---")
    logger.info(f"User: '{request.message}'")
    
    # 1. Load history
    history = load_recent_messages(request.session_id, limit=6)
    
    # 2. Run Agent
    try:
        reply = run_agent(request.session_id, request.message, history)
    except Exception as e:
        logger.error(f"Agent execution failed: {e}")
        reply = "I'm sorry, I'm experiencing technical difficulties right now. Please try again later."
    
    logger.info(f"Assistant: '{reply[:100]}...'")
    
    # 3. Save to memory
    save_message(request.session_id, "user", request.message)
    save_message(request.session_id, "assistant", reply)
    
    return ChatResponse(reply=reply)

@app.post("/orders")
def create_order(payload: CreateOrderRequest):
    order_number = f"ORD{random.randint(1000,9999)}"
    # Insert into Supabase (combining name and address so the AI can read it without needing a new SQL column)
    supabase.table("orders").insert({
        "order_number": order_number,
        "customer_name": f"{payload.customer_name} (Delivery To: {payload.delivery_address})",
        "session_id": payload.session_id,
        "status": "preparing",
        "restaurant_name": "FoodieAI Kitchen",
        "items": payload.items,
        "total_amount": payload.total_amount,
        "delivery_eta": "35 mins"
    }).execute()
    return {"order_number": order_number}

@app.get("/orders")
def get_orders(session_id: str):
    result = supabase.table("orders").select("*").eq("session_id", session_id).order("created_at", desc=True).execute()
    return result.data

@app.get("/history")
def get_history(session_id: str):
    result = supabase.table("conversations").select("*").eq("session_id", session_id).order("created_at").execute()
    return result.data

if __name__ == "__main__":
    logger.info("Starting up FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
