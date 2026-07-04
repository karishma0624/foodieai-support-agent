from pydantic import BaseModel

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str

class CreateOrderRequest(BaseModel):
    session_id: str
    customer_name: str
    delivery_address: str
    items: list[dict]
    total_amount: float
