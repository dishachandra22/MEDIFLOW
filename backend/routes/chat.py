from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import ChatRequest, ChatResponse
from ai.assistant import assistant_orchestrator

router = APIRouter(prefix="/api", tags=["Chat"])

@router.post("/chat", response_model=ChatResponse)
def handle_chat(payload: ChatRequest, db: Session = Depends(get_db)):
    if not payload.message or not payload.message.strip():
        raise HTTPException(status_code=400, detail="Query message cannot be empty.")
    
    patient_id = payload.patient_id or 1
    res = assistant_orchestrator.process_query(db, user_query=payload.message, patient_id=patient_id)
    return res
