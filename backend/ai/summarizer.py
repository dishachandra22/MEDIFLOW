from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models import Patient, MedicalRecord, Appointment, Doctor

class PatientRecordSummarizer:
    def summarize_patient(self, db: Session, patient_id: int) -> Dict[str, Any]:
        patient = db.query(Patient).filter(Patient.id == patient_id).first()
        if not patient:
            return {
                "error": "Patient not found",
                "summary": "No patient record found for the provided ID."
            }

        records = db.query(MedicalRecord).filter(MedicalRecord.patient_id == patient_id).order_by(MedicalRecord.record_date.desc()).all()
        appointments = db.query(Appointment).filter(Appointment.patient_id == patient_id).order_by(Appointment.appointment_date.desc()).all()

        upcoming_apps = [a for a in appointments if a.status in ["Confirmed", "Scheduled"]]
        past_apps = [a for a in appointments if a.status == "Completed"]

        # Build bulleted clinical & administrative summary
        visit_summaries = []
        for r in records[:3]:
            doc = db.query(Doctor).filter(Doctor.id == r.doctor_id).first() if r.doctor_id else None
            doc_str = f" with {doc.name}" if doc else ""
            visit_summaries.append(
                f"- **{r.record_date.strftime('%d %b %Y')}**: {r.department_name} department ({r.visit_type}){doc_str}. "
                f"Complaint: '{r.chief_complaint}'. Notes: {r.doctor_notes} Key Findings: {r.lab_results}"
            )

        upcoming_str = "None currently scheduled."
        if upcoming_apps:
            next_app = upcoming_apps[0]
            next_doc = db.query(Doctor).filter(Doctor.id == next_app.doctor_id).first()
            next_doc_name = next_doc.name if next_doc else "Specialist"
            upcoming_str = f"{next_app.appointment_date.strftime('%d %b %Y')} at {next_app.appointment_time} with {next_doc_name} ({next_app.reason})"

        summary_text = (
            f"**Patient Summary for {patient.name} ({patient.age} yrs, {patient.gender}):**\n\n"
            f"**Medical History Overview:** {patient.medical_history_summary}\n\n"
            f"**Recent Clinical Encounters:**\n"
            + ("\n".join(visit_summaries) if visit_summaries else "No recent clinical records logged.") + "\n\n"
            f"**Upcoming Scheduled Appointment:** {upcoming_str}"
        )

        key_insights = [
            f"Active patient record with {len(records)} previous visit entries.",
            f"Next scheduled visit: {upcoming_str}"
        ]

        return {
            "patient_id": patient.id,
            "patient_name": patient.name,
            "age": patient.age,
            "summary": summary_text,
            "key_insights": key_insights,
            "disclaimer": "AI Record Summary is for administrative and review purposes only. Does not replace professional clinical evaluation."
        }

summarizer = PatientRecordSummarizer()
