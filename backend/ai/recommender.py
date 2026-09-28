from datetime import date, timedelta
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models import Doctor, Department, TimeSlot

class DoctorRecommender:
    def recommend(
        self,
        db: Session,
        department_name: Optional[str] = None,
        time_preference: Optional[str] = None,
        max_results: int = 3
    ) -> List[Dict[str, Any]]:
        
        query = db.query(Doctor)
        
        # 1. Department Filter
        if department_name:
            dept = db.query(Department).filter(Department.name.ilike(f"%{department_name}%")).first()
            if dept:
                query = query.filter(Doctor.department_id == dept.id)

        doctors = query.all()
        if not doctors:
            # Fallback to all doctors if requested department not explicitly found
            doctors = db.query(Doctor).limit(max_results).all()

        today = date.today()
        target_dates = [today]
        if time_preference == "tomorrow":
            target_dates = [today + timedelta(days=1)]
        elif time_preference == "this_week":
            target_dates = [today, today + timedelta(days=1), today + timedelta(days=2), today + timedelta(days=5)]
        else:
            target_dates = [today, today + timedelta(days=1), today + timedelta(days=2)]

        recommendations = []

        for doc in doctors:
            # Fetch unbooked slots on target dates
            slots = db.query(TimeSlot).filter(
                TimeSlot.doctor_id == doc.id,
                TimeSlot.is_booked == False,
                TimeSlot.slot_date.in_(target_dates)
            ).order_by(TimeSlot.slot_date.asc(), TimeSlot.slot_time.asc()).all()

            dept_obj = db.query(Department).filter(Department.id == doc.department_id).first()
            dept_title = dept_obj.name if dept_obj else "Specialist"

            if slots:
                earliest_slot = slots[0]
                date_str = earliest_slot.slot_date.strftime("%b %d, %Y")
                if earliest_slot.slot_date == today:
                    day_label = "today"
                elif earliest_slot.slot_date == today + timedelta(days=1):
                    day_label = "tomorrow"
                else:
                    day_label = f"on {date_str}"

                why_reason = (
                    f"{doc.name} is recommended as a top-rated {doc.specialization} ({doc.qualification}) "
                    f"with {doc.experience_years} years of clinical experience. Earliest available slot is {day_label} at {earliest_slot.slot_time}."
                )

                recommendations.append({
                    "doctor_id": doc.id,
                    "name": doc.name,
                    "department_name": dept_title,
                    "specialization": doc.specialization,
                    "rating": doc.rating,
                    "experience_years": doc.experience_years,
                    "qualification": doc.qualification,
                    "room_number": doc.room_number,
                    "next_available_date": str(earliest_slot.slot_date),
                    "next_available_time": earliest_slot.slot_time,
                    "slot_id": earliest_slot.id,
                    "all_slots": [
                        {"id": s.id, "date": str(s.slot_date), "time": s.slot_time}
                        for s in slots[:4]
                    ],
                    "why_recommended": why_reason
                })

        # Sort recommendations by rating descending & experience descending
        recommendations.sort(key=lambda x: (x["rating"], x["experience_years"]), reverse=True)
        return recommendations[:max_results]

recommender = DoctorRecommender()
