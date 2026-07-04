import sys
import os

# Add the root directory to path to import db and data modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from data.knowledge_base_data import KNOWLEDGE_BASE_DOCS
from db.supabase_client import supabase
import google.generativeai as genai
from utils.logger import logger

def embed_knowledge_base():
    logger.info("Starting embedding of knowledge base...")
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    
    for doc in KNOWLEDGE_BASE_DOCS:
        logger.info(f"Embedding document: {doc['title']}")
        try:
            # Embed using official SDK
            response = genai.embed_content(
                model="models/gemini-embedding-001",
                content=doc['content'],
                task_type="retrieval_document",
                title=doc['title']
            )
            embedding = response["embedding"]
            
            # Insert into Supabase
            data = {
                "title": doc['title'],
                "category": doc['category'],
                "content": doc['content'],
                "embedding": embedding
            }
            
            supabase.table("knowledge_base").insert(data).execute()
            logger.info(f"Successfully inserted: {doc['title']}")
        except Exception as e:
            logger.error(f"Error processing {doc['title']}: {e}")
            
    logger.info("Knowledge base embedding completed.")

if __name__ == "__main__":
    embed_knowledge_base()