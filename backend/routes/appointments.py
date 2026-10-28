from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Appointment, Doctor, Department, TimeSlot, Patient
from app.schemas import AppointmentCreate, AppointmentSchema
from datetime import date, datetime

router = APIRouter(prefix="/api", tags=["Appointments"])

@router.post("/appointments")
def create_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == payload.doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found.")

    patient = db.query(Patient).filter(Patient.id == payload.patient_id).first()
    if not patient:
        patient_id = 1
    else:
        patient_id = patient.id

    parsed_date = date.fromisoformat(payload.appointment_date) if isinstance(payload.appointment_date, str) else payload.appointment_date

    # If slot_id is provided, mark it booked
    if payload.slot_id:
        slot = db.query(TimeSlot).filter(TimeSlot.id == payload.slot_id).first()
        if slot:
            slot.is_booked = True
            db.commit()

    appointment = Appointment(
        patient_id=patient_id,
        doctor_id=payload.doctor_id,
        slot_id=payload.slot_id,
        appointment_date=parsed_date,
        appointment_time=payload.appointment_time,
        status="Confirmed",
        reason=payload.reason or "Specialist Consultation",
        created_at=datetime.utcnow()
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    dept = db.query(Department).filter(Department.id == doc.department_id).first()

    return {
        "message": "Appointment successfully booked!",
        "appointment_id": appointment.id,
        "doctor_name": doc.name,
        "department_name": dept.name if dept else "General",
        "appointment_date": str(appointment.appointment_date),
        "appointment_time": appointment.appointment_time,
        "status": appointment.status,
        "reason": appointment.reason
    }

@router.get("/appointments")
def get_appointments(patient_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    q = db.query(Appointment)
    if patient_id:
        q = q.filter(Appointment.patient_id == patient_id)

    appointments = q.order_by(Appointment.appointment_date.desc()).all()
    result = []
    for app in appointments:
        doc = db.query(Doctor).filter(Doctor.id == app.doctor_id).first()
        dept = db.query(Department).filter(Department.id == doc.department_id).first() if doc else None
        pat = db.query(Patient).filter(Patient.id == app.patient_id).first()

        result.append({
            "id": app.id,
            "patient_id": app.patient_id,
            "patient_name": pat.name if pat else "Unknown Patient",
            "doctor_id": app.doctor_id,
            "doctor_name": doc.name if doc else "Unassigned Doctor",
            "department_name": dept.name if dept else "General",
            "appointment_date": str(app.appointment_date),
            "appointment_time": app.appointment_time,
            "status": app.status,
            "reason": app.reason,
            "created_at": app.created_at.isoformat() if app.created_at else None
        })
    return result

@router.put("/appointments/{appointment_id}/cancel")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):
    app = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    app.status = "Cancelled"
    if app.slot_id:
        slot = db.query(TimeSlot).filter(TimeSlot.id == app.slot_id).first()
        if slot:
            slot.is_booked = False
    db.commit()
    return {"message": "Appointment cancelled successfully", "appointment_id": appointment_id, "status": "Cancelled"}

@router.put("/appointments/{appointment_id}/status")
def update_appointment_status(appointment_id: int, payload: dict, db: Session = Depends(get_db)):
    app = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Appointment not found")
    new_status = payload.get("status", "Confirmed")
    app.status = new_status
    db.commit()
    return {"message": f"Appointment status updated to {new_status}", "appointment_id": appointment_id, "status": new_status}
