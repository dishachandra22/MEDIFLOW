from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import KnowledgeBaseArticle
from ai.knowledge_base import knowledge_base_engine

router = APIRouter(prefix="/api", tags=["Hospital Knowledge Base FAQ"])

@router.get("/faq")
def get_faqs(q: Optional[str] = Query(None), db: Session = Depends(get_db)):
    articles = db.query(KnowledgeBaseArticle).all()
    
    if q and q.strip():
        kb_match = knowledge_base_engine.query_kb(db, q)
        return {
            "query": q,
            "search_result": kb_match,
            "articles": [
                {
                    "id": a.id,
                    "category": a.category,
                    "question": a.question,
                    "answer": a.answer,
                    "keywords": a.keywords,
                    "source": "Hospital Knowledge Base"
                }
                for a in articles
            ]
        }

    return {
        "query": None,
        "search_result": None,
        "articles": [
            {
                "id": a.id,
                "category": a.category,
                "question": a.question,
                "answer": a.answer,
                "keywords": a.keywords,
                "source": "Hospital Knowledge Base"
            }
            for a in articles
        ]
    }
