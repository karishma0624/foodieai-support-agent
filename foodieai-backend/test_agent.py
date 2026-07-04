import traceback
import os
from agent.agent import run_agent
try:
    print("Testing agent...")
    print(run_agent('test_session', 'when will I get my order', []))
except Exception as e:
    print("CRASH TRACEBACK:")
    traceback.print_exc()
