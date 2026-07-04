from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI
from agent.tools import (
    retrieve_knowledge_base,
    get_order_status,
    cancel_order,
    create_support_ticket,
    recommend_menu_for_group
)
from agent.prompts import SYSTEM_PROMPT
from utils.logger import logger
import os

# Initialize LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", 
    temperature=0.2,
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# List of tools
tools = [
    retrieve_knowledge_base,
    get_order_status,
    cancel_order,
    create_support_ticket,
    recommend_menu_for_group
]

# Define prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# Create Agent
logger.info("Initializing LangChain tool-calling agent...")
agent = create_tool_calling_agent(llm, tools, prompt)

# Create Agent Executor
agent_executor = AgentExecutor(
    agent=agent, 
    tools=tools, 
    verbose=False  # We use our own logger for observability
)

def run_agent(session_id: str, message: str, chat_history: list) -> str:
    """
    Executes the agent with the given message and history.
    """
    logger.info(f"Running agent for session: {session_id}")
    
    # Format chat history for LangChain
    formatted_history = []
    for msg in chat_history:
        if msg["role"] == "user":
            formatted_history.append(("human", msg["content"]))
        else:
            formatted_history.append(("ai", msg["content"]))
            
    response = agent_executor.invoke({
        "input": message,
        "chat_history": formatted_history
    })
    
    reply = response.get("output", "I'm sorry, I encountered an error processing your request.")
    logger.info("Agent response generated successfully.")
    return reply
