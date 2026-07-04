export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem("foodieai_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("foodieai_session_id", sessionId);
  }
  return sessionId;
}
