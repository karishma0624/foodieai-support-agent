import os
import google.generativeai as genai
from db.supabase_client import supabase
from utils.logger import logger

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def retrieve_knowledge_base_core(query: str, match_threshold: float = 0.5, match_count: int = 3) -> str:
    """
    Core RAG function to embed a query and search the Supabase knowledge_base.
    Returns a formatted string of the matching documents.
    """
    logger.info(f"RAG Core invoked for query: '{query}'")
    try:
        # Embed the query using the official SDK
        response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=query,
            task_type="retrieval_query"
        )
        query_embedding = response["embedding"]
        
        # Call the Supabase RPC function for similarity search
        db_response = supabase.rpc(
            "match_knowledge_base",
            {
                "query_embedding": query_embedding,
                "match_threshold": match_threshold,
                "match_count": match_count
            }
        ).execute()
        
        results = db_response.data
        if not results:
            logger.info("RAG Core: No matching documents found.")
            return "No specific policy or guideline found."
            
        logger.info(f"RAG Core: Retrieved {len(results)} matching documents.")
        
        # Format the context
        context_parts = []
        for i, row in enumerate(results):
            similarity = row.get("similarity", 0)
            logger.info(f"Match {i+1}: '{row['title']}' (Similarity: {similarity:.2f})")
            context_parts.append(f"Title: {row['title']}\nContent: {row['content']}")
            
        return "\n\n---\n\n".join(context_parts)
    except Exception as e:
        logger.error(f"Error in RAG Core: {e}")
        return f"Error retrieving context: {e}"
