from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Patient, MedicalRecord, Appointment, Doctor
from ai.summarizer import summarizer

router = APIRouter(prefix="/api", tags=["Patients & Records"])

@router.get("/patients/{patient_id}")
def get_patient_detail(patient_id: int, db: Session = Depends(get_db)):
    pat = db.query(Patient).filter(Patient.id == patient_id).first()
    if not pat:
        raise HTTPException(status_code=404, detail="Patient not found")

    records = db.query(MedicalRecord).filter(MedicalRecord.patient_id == patient_id).all()
    appointments = db.query(Appointment).filter(Appointment.patient_id == patient_id).all()

    record_list = []
    for r in records:
        doc = db.query(Doctor).filter(Doctor.id == r.doctor_id).first() if r.doctor_id else None
        record_list.append({
            "id": r.id,
            "record_date": str(r.record_date),
            "department_name": r.department_name,
            "visit_type": r.visit_type,
            "chief_complaint": r.chief_complaint,
            "doctor_notes": r.doctor_notes,
            "lab_results": r.lab_results,
            "follow_up_date": str(r.follow_up_date) if r.follow_up_date else None,
            "doctor_name": doc.name if doc else None
        })

    return {
        "id": pat.id,
        "name": pat.name,
        "age": pat.age,
        "gender": pat.gender,
        "phone": pat.phone,
        "email": pat.email,
        "blood_group": pat.blood_group,
        "medical_history_summary": pat.medical_history_summary,
        "records": record_list,
        "total_appointments": len(appointments)
    }

@router.post("/patients/{patient_id}/summary")
def generate_patient_summary(patient_id: int, db: Session = Depends(get_db)):
    summary_data = summarizer.summarize_patient(db, patient_id)
    if "error" in summary_data:
        raise HTTPException(status_code=404, detail=summary_data["error"])
    return summary_data
