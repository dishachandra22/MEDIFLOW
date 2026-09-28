from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Doctor, Department, TimeSlot
from app.schemas import DoctorSchema, TimeSlotSchema
from datetime import date

router = APIRouter(prefix="/api", tags=["Doctors & Departments"])

@router.get("/departments")
def get_departments(db: Session = Depends(get_db)):
    depts = db.query(Department).all()
    return depts

@router.get("/doctors")
def get_doctors(
    department_id: Optional[int] = Query(None),
    query: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    q = db.query(Doctor)
    if department_id:
        q = q.filter(Doctor.department_id == department_id)
    if query:
        q = q.filter(Doctor.name.ilike(f"%{query}%") | Doctor.specialization.ilike(f"%{query}%"))
    
    doctors = q.all()
    result = []
    for doc in doctors:
        dept = db.query(Department).filter(Department.id == doc.department_id).first()
        result.append({
            "id": doc.id,
            "name": doc.name,
            "department_id": doc.department_id,
            "department_name": dept.name if dept else "General",
            "specialization": doc.specialization,
            "qualification": doc.qualification,
            "experience_years": doc.experience_years,
            "rating": doc.rating,
            "bio": doc.bio,
            "room_number": doc.room_number
        })
    return result

@router.get("/doctors/{doctor_id}/slots", response_model=List[TimeSlotSchema])
def get_doctor_slots(doctor_id: int, slot_date: Optional[str] = None, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    q = db.query(TimeSlot).filter(TimeSlot.doctor_id == doctor_id, TimeSlot.is_booked == False)
    if slot_date:
        try:
            parsed_date = date.fromisoformat(slot_date)
            q = q.filter(TimeSlot.slot_date == parsed_date)
        except ValueError:
            pass

    slots = q.order_by(TimeSlot.slot_date.asc(), TimeSlot.slot_time.asc()).all()
    return slots
