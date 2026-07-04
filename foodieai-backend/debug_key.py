from dotenv import load_dotenv
import os
import google.generativeai as genai

# Explicitly load from .env
load_dotenv(override=True)
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("ERROR: No API key found in .env!")
    exit(1)

print(f"Loaded API Key starting with: {api_key[:10]}...")

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")
    print("Sending test request to Gemini 2.5 API...")
    response = model.generate_content("Say hello in one word.")
    print("SUCCESS! API Response:", response.text)
except Exception as e:
    print("API REQUEST FAILED!")
    print(f"Error Type: {type(e).__name__}")
    print(f"Error Message: {str(e)}")
