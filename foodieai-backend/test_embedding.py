import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

result = genai.embed_content(
    model="models/gemini-embedding-001",
    content="Hello world",
    task_type="retrieval_document",
)

print("Embedding length:", len(result["embedding"]))