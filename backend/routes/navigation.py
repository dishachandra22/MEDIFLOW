from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import HospitalLocation

router = APIRouter(prefix="/api", tags=["Hospital Navigation"])

@router.get("/navigation")
def search_navigation(query: Optional[str] = Query(None), db: Session = Depends(get_db)):
    all_locations = db.query(HospitalLocation).all()
    if not query or not query.strip():
        return {
            "query": query,
            "matched_location": None,
            "all_locations": all_locations
        }

    q = query.lower().strip()
    matched = None
    for loc in all_locations:
        if loc.name.lower() in q or loc.department_name.lower() in q:
            matched = loc
            break

    answer_text = None
    if matched:
        answer_text = f"The {matched.name} is located on the {matched.floor} ({matched.building}), Room {matched.room_number}. Landmark: {matched.landmark}. Directions: {matched.directions}"
    else:
        answer_text = f"No exact room match found for '{query}'. Please check the hospital floor map or ask at the ground floor main reception."

    return {
        "query": query,
        "answer": answer_text,
        "matched_location": matched,
        "all_locations": all_locations
    }
