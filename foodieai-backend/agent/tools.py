import json
from langchain.tools import tool
from db.supabase_client import supabase
from agent.rag import retrieve_knowledge_base_core
from utils.logger import logger
from typing import Optional

@tool
def retrieve_knowledge_base(query: str) -> str:
    """
    Use this tool to search the knowledge base for company policies, 
    refunds, cancellations, delivery rules, coupons, and FAQs.
    """
    logger.info(f"Tool selected: retrieve_knowledge_base for query: '{query}'")
    return retrieve_knowledge_base_core(query)

@tool
def get_order_status(order_number: str) -> str:
    """
    Look up an order by its order_number (e.g. ORD1256).
    Returns status, restaurant, items, total, and delivery ETA.
    """
    logger.info(f"Tool selected: get_order_status for {order_number}")
    try:
        response = supabase.table("orders").select("*").eq("order_number", order_number).execute()
        results = response.data
        if not results:
            return f"Could not find any order with number {order_number}."
        order = results[0]
        return (
            f"Order: {order['order_number']}\n"
            f"Status: {order['status']}\n"
            f"Restaurant: {order['restaurant_name']}\n"
            f"Total: ₹{order['total_amount']}\n"
            f"ETA: {order['delivery_eta']}\n"
            f"Items: {json.dumps(order['items'])}"
        )
    except Exception as e:
        logger.error(f"Error in get_order_status: {e}")
        return f"Error retrieving order: {e}"

@tool
def cancel_order(order_number: str) -> str:
    """
    Cancels an order by updating its status to 'cancelled'. 
    Only allowed if the current status is 'preparing'.
    """
    logger.info(f"Tool selected: cancel_order for {order_number}")
    try:
        response = supabase.table("orders").select("status").eq("order_number", order_number).execute()
        results = response.data
        if not results:
            return f"Order {order_number} not found."
        
        current_status = results[0]['status']
        if current_status != 'preparing':
            return f"Cannot cancel order {order_number} because its status is '{current_status}'. Orders can only be cancelled while 'preparing'."
            
        update_response = supabase.table("orders").update({"status": "cancelled"}).eq("order_number", order_number).execute()
        return f"Order {order_number} has been successfully cancelled."
    except Exception as e:
        logger.error(f"Error in cancel_order: {e}")
        return f"Error cancelling order: {e}"

@tool
def create_support_ticket(order_number: str, issue_type: str, description: str) -> str:
    """
    Creates a support ticket for escalated issues.
    """
    logger.info(f"Tool selected: create_support_ticket for {order_number}, type: {issue_type}")
    try:
        data = {
            "order_number": order_number,
            "issue_type": issue_type,
            "description": description
        }
        supabase.table("support_tickets").insert(data).execute()
        return f"Support ticket created successfully for order {order_number}. Our human team will review it shortly."
    except Exception as e:
        logger.error(f"Error in create_support_ticket: {e}")
        return f"Error creating ticket: {e}"

@tool
def recommend_menu_for_group(people: int, occasion: str, dietary_preference: Optional[str] = None, budget: Optional[float] = None) -> str:
    """
    Generates menu and quantity recommendations based on group size and occasion.
    Uses the knowledge base internally to fetch guidelines.
    """
    logger.info(f"Tool selected: recommend_menu_for_group for {people} people, occasion: {occasion}")
    
    # 1. Retrieve relevant guidelines from KB via the reusable RAG core
    query = f"recommendations and guidelines for {occasion} serving {people} people menu items"
    context = retrieve_knowledge_base_core(query, match_count=4)
    
    # 2. Package it up for the LLM to process
    return (
        f"You need to recommend food for {people} people for a '{occasion}'.\n"
        f"Dietary Preference: {dietary_preference or 'None specified'}\n"
        f"Budget: {budget or 'None specified'}\n\n"
        f"Use the following portion guidelines and menu catalog to formulate your response:\n"
        f"---\n{context}\n---\n"
        "Calculate the specific quantities needed (e.g. X kg of rice, Y pieces of naan, Z curries) based on the number of people and suggest specific dishes from the catalog."
    )
