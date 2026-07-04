from db.supabase_client import supabase
from utils.logger import logger
from typing import List, Dict

def load_recent_messages(session_id: str, limit: int = 6) -> List[Dict[str, str]]:
    """
    Loads the last `limit` messages from the conversations table for the given session_id.
    Returns a list of dicts: [{'role': 'user'|'assistant', 'content': '...'}]
    """
    logger.info(f"Loading conversation history for session: {session_id}")
    try:
        response = supabase.table("conversations").select("*").eq("session_id", session_id).order("created_at", desc=True).limit(limit).execute()
        messages = response.data
        # Supabase returns them ordered by created_at DESC, so we reverse to get chronological order
        messages.reverse()
        
        history = [{"role": msg["role"], "content": msg["content"]} for msg in messages]
        logger.info(f"Loaded {len(history)} past messages for session {session_id}")
        return history
    except Exception as e:
        logger.error(f"Error loading messages for {session_id}: {e}")
        return []

def save_message(session_id: str, role: str, content: str):
    """
    Saves a message to the conversations table.
    """
    logger.info(f"Saving {role} message to session {session_id}")
    try:
        supabase.table("conversations").insert({
            "session_id": session_id,
            "role": role,
            "content": content
        }).execute()
    except Exception as e:
        logger.error(f"Error saving message for {session_id}: {e}")
