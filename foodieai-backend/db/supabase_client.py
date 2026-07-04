import os
import re
from dotenv import load_dotenv
from supabase import create_client, Client
import supabase._sync.client
from utils.logger import logger

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    logger.error("Missing Supabase credentials in .env")
    raise ValueError("Missing Supabase credentials")

# Fix URL if it contains /rest/v1/
if SUPABASE_URL.endswith("/rest/v1/"):
    SUPABASE_URL = SUPABASE_URL.replace("/rest/v1/", "")
elif SUPABASE_URL.endswith("/rest/v1"):
    SUPABASE_URL = SUPABASE_URL.replace("/rest/v1", "")

# Monkeypatch regex match to bypass JWT validation if the key is not a standard JWT
original_match = supabase._sync.client.re.match

def mock_match(pattern, string, flags=0):
    if pattern == r"^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$":
        return True
    return original_match(pattern, string, flags)

supabase._sync.client.re.match = mock_match

# Create the client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
logger.info("Supabase client initialized successfully.")
