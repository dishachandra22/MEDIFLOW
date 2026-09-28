from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app.database import get_db
from app.models import Appointment, Patient, Doctor, Department, MedicalRecord, TimeSlot

router = APIRouter(prefix="/api", tags=["Dashboards & Analytics"])

@router.get("/staff/overview")
def get_staff_overview(db: Session = Depends(get_db)):
    today = date.today()
    
    total_patients = db.query(Patient).count()
    total_doctors = db.query(Doctor).count()
    total_departments = db.query(Department).count()
    
    today_appointments = db.query(Appointment).filter(Appointment.appointment_date == today).all()
    all_appointments = db.query(Appointment).all()

    # Department distribution count
    dept_counts = {}
    depts = db.query(Department).all()
    for d in depts:
        dept_counts[d.name] = 0

    for app in all_appointments:
        doc = db.query(Doctor).filter(Doctor.id == app.doctor_id).first()
        if doc and doc.department:
            dept_counts[doc.department.name] = dept_counts.get(doc.department.name, 0) + 1

    highest_dept = max(dept_counts, key=dept_counts.get) if dept_counts else "Cardiology"
    highest_count = dept_counts.get(highest_dept, 0)

    ai_insight = (
        f"AI Insight: **{highest_dept}** department has recorded the highest number of appointment requests ({highest_count} visits) this period. "
        f"Staff recommendation: Ensure OPD Room 102 staff is fully staffed during peak morning hours (10:00 AM – 12:00 PM)."
    )

    recent_appointments = []
    for app in all_appointments[:6]:
        pat = db.query(Patient).filter(Patient.id == app.patient_id).first()
        doc = db.query(Doctor).filter(Doctor.id == app.doctor_id).first()
        recent_appointments.append({
            "id": app.id,
            "patient_name": pat.name if pat else "Unknown",
            "doctor_name": doc.name if doc else "Specialist",
            "department_name": doc.department.name if (doc and doc.department) else "General",
            "appointment_date": str(app.appointment_date),
            "appointment_time": app.appointment_time,
            "status": app.status,
            "reason": app.reason
        })

    department_status = [
        {"name": d.name, "floor": d.floor, "room": d.room_number, "total_appointments": dept_counts.get(d.name, 0), "status": "Operational"}
        for d in depts
    ]

    return {
        "metrics": {
            "total_patients": total_patients,
            "total_doctors": total_doctors,
            "total_departments": total_departments,
            "today_appointments_count": len(today_appointments),
            "pending_requests_count": 3
        },
        "ai_insight": ai_insight,
        "department_distribution": dept_counts,
        "department_status": department_status,
        "recent_appointments": recent_appointments
    }


@router.get("/doctor/{doctor_id}/today")
def get_doctor_today_schedule(doctor_id: int, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        # Fall back to Doctor 1 (Dr. Ananya Rao)
        doc = db.query(Doctor).filter(Doctor.id == 1).first()

    today = date.today()
    apps = db.query(Appointment).filter(Appointment.doctor_id == doc.id).order_by(Appointment.appointment_date.asc()).all()

    schedule = []
    for app in apps:
        pat = db.query(Patient).filter(Patient.id == app.patient_id).first()
        schedule.append({
            "appointment_id": app.id,
            "patient_id": app.patient_id,
            "patient_name": pat.name if pat else "Unknown Patient",
            "patient_age": pat.age if pat else 30,
            "patient_gender": pat.gender if pat else "Female",
            "appointment_date": str(app.appointment_date),
            "appointment_time": app.appointment_time,
            "reason": app.reason,
            "status": app.status,
            "medical_history": pat.medical_history_summary if pat else "No history"
        })

    dept = db.query(Department).filter(Department.id == doc.department_id).first()

    return {
        "doctor_id": doc.id,
        "doctor_name": doc.name,
        "specialization": doc.specialization,
        "department_name": dept.name if dept else "General",
        "room_number": doc.room_number,
        "today_appointments_count": len([s for s in schedule if s["appointment_date"] == str(today)]),
        "schedule": schedule
    }
