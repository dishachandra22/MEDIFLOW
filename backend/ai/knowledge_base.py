from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models import KnowledgeBaseArticle

class KnowledgeBaseEngine:
    def query_kb(self, db: Session, user_query: str) -> Optional[Dict[str, Any]]:
        normalized = user_query.lower().strip()
        articles = db.query(KnowledgeBaseArticle).all()

        best_article = None
        best_score = 0

        for art in articles:
            score = 0
            keywords = [k.strip().lower() for k in art.keywords.split(",") if k.strip()]
            for kw in keywords:
                if kw in normalized:
                    score += 2
            
            # Check title / category matches
            if art.category.lower() in normalized:
                score += 3
            if art.question.lower() in normalized:
                score += 4

            if score > best_score:
                best_score = score
                best_article = art

        if best_article and best_score >= 2:
            return {
                "category": best_article.category,
                "question": best_article.question,
                "answer": best_article.answer,
                "source": "Hospital Knowledge Base",
                "match_confidence": min(0.98, 0.70 + (best_score * 0.05))
            }

        return None

knowledge_base_engine = KnowledgeBaseEngine()
