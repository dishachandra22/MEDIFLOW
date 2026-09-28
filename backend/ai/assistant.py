from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from .safety import safety_checker
from .intent_detector import intent_detector
from .recommender import recommender
from .summarizer import summarizer
from .knowledge_base import knowledge_base_engine
from .llm_provider import get_llm_provider
from app.models import HospitalLocation, Appointment, Patient, Doctor, Department, TimeSlot
from datetime import date, timedelta

class AIAssistantOrchestrator:
    def process_query(self, db: Session, user_query: str, patient_id: int = 1) -> Dict[str, Any]:
        # Step 1: Safety Check Guardrail
        safety_res = safety_checker.check_query(user_query)
        if not safety_res["is_safe"]:
            return {
                "message": safety_res["refusal_message"],
                "detected_intent": "Medical Advice Request (Refused)",
                "confidence": 1.0,
                "entities": {"department": None, "time_preference": None, "requirement": "Medical Diagnosis Guardrail"},
                "action": "safety_refusal",
                "cards": [
                    {
                        "card_type": "safety_card",
                        "title": "Medical Disclaimer & Safety Protocol",
                        "content": "MediFlow AI is restricted from offering medical diagnosis or treatment plans.",
                        "emergency_contact": "+91 1800-999-0000",
                        "emergency_location": "Emergency Ward, Ground Floor"
                    }
                ],
                "safety_flag": True
            }

        # Step 2: Intent & Entity NLP Analysis
        nlp_res = intent_detector.detect(user_query)
        intent = nlp_res["intent"]
        confidence = nlp_res["confidence"]
        entities = nlp_res["entities"]

        cards = []
        action = None
        message = ""

        llm = get_llm_provider()

        # Step 3: Intent Pipeline Routing
        
        # Scenario A: Navigation Queries ("Where is radiology?", "Where is the laboratory?")
        normalized_q = user_query.lower()
        if "where" in normalized_q or "location" in normalized_q or "floor" in normalized_q:
            intent = "Hospital Navigation"
            confidence = 0.95
            locs = db.query(HospitalLocation).all()
            matched_loc = None
            for loc in locs:
                if loc.name.lower() in normalized_q or loc.department_name.lower() in normalized_q:
                    matched_loc = loc
                    break
            
            if matched_loc:
                message = f"The **{matched_loc.name}** is located on the **{matched_loc.floor}** ({matched_loc.building}), Room {matched_loc.room_number}. Landmark: {matched_loc.landmark}."
                cards.append({
                    "card_type": "location_card",
                    "room_name": matched_loc.name,
                    "department_name": matched_loc.department_name,
                    "floor": matched_loc.floor,
                    "room_number": matched_loc.room_number,
                    "landmark": matched_loc.landmark,
                    "directions": matched_loc.directions,
                    "building": matched_loc.building
                })
                action = "highlight_floor_map"
                entities["department"] = matched_loc.department_name
                entities["requirement"] = f"Location lookup for {matched_loc.name}"

        # Scenario B: Doctor Search / Recommendation ("I need to see a cardiologist", "I need skin specialist", "doctors tomorrow?")
        if intent in ["Doctor Search", "Appointment Booking"] and not cards:
            dept_name = entities.get("department")
            time_pref = entities.get("time_preference")
            recs = recommender.recommend(db, department_name=dept_name, time_preference=time_pref)

            if recs:
                message = f"I found top-rated specialists available for your requirement ({dept_name or 'General'}). Here are the recommended doctors:"
                for doc in recs:
                    cards.append({
                        "card_type": "doctor_card",
                        "doctor_id": doc["doctor_id"],
                        "name": doc["name"],
                        "department_name": doc["department_name"],
                        "specialization": doc["specialization"],
                        "rating": doc["rating"],
                        "experience_years": doc["experience_years"],
                        "qualification": doc["qualification"],
                        "available_date": doc["next_available_date"],
                        "available_time": doc["next_available_time"],
                        "slot_id": doc["slot_id"],
                        "why_recommended": doc["why_recommended"],
                        "all_slots": doc["all_slots"]
                    })
                action = "display_doctor_recommendations"
            else:
                message = "I couldn't find available slots matching that exact filter, but here are our general hospital specialists:"

        # Scenario C: Appointment Status ("When is my next appointment?")
        elif intent == "Appointment Status":
            today = date.today()
            apps = db.query(Appointment).filter(
                Appointment.patient_id == patient_id,
                Appointment.appointment_date >= today
            ).order_by(Appointment.appointment_date.asc()).all()

            if apps:
                next_app = apps[0]
                doc = db.query(Doctor).filter(Doctor.id == next_app.doctor_id).first()
                doc_name = doc.name if doc else "Specialist"
                dept = db.query(Department).filter(Department.id == doc.department_id).first() if doc else None
                dept_name = dept.name if dept else "General"

                message = f"Your next appointment is scheduled for **{next_app.appointment_date.strftime('%A, %b %d, %Y')}** at **{next_app.appointment_time}** with **{doc_name}** ({dept_name})."
                cards.append({
                    "card_type": "appointment_status_card",
                    "appointment_id": next_app.id,
                    "patient_name": "Varsha",
                    "doctor_name": doc_name,
                    "department_name": dept_name,
                    "appointment_date": str(next_app.appointment_date),
                    "appointment_time": next_app.appointment_time,
                    "status": next_app.status,
                    "reason": next_app.reason,
                    "location": f"Room {doc.room_number}, {dept.floor if dept else 'Main Wing'}"
                })
                action = "show_upcoming_appointment"
            else:
                message = "You currently have no upcoming appointments scheduled. Would you like me to recommend a doctor for booking?"

        # Scenario D: Patient Record Summary ("Summarize my recent appointments")
        elif intent == "Patient Record Summary":
            summary_res = summarizer.summarize_patient(db, patient_id)
            message = summary_res["summary"]
            cards.append({
                "card_type": "summary_card",
                "patient_name": summary_res["patient_name"],
                "age": summary_res["age"],
                "key_insights": summary_res.get("key_insights", []),
                "summary": summary_res["summary"],
                "disclaimer": summary_res["disclaimer"]
            })
            action = "display_patient_summary"

        # Scenario E: Knowledge Base FAQ Lookup ("What documents do I need for registration?", "visiting hours?")
        elif intent in ["Hospital Information", "General Hospital Assistance"] and not cards:
            kb_res = knowledge_base_engine.query_kb(db, user_query)
            if kb_res:
                message = kb_res["answer"]
                cards.append({
                    "card_type": "faq_card",
                    "category": kb_res["category"],
                    "question": kb_res["question"],
                    "answer": kb_res["answer"],
                    "source": kb_res["source"]
                })
                action = "display_faq_answer"
            else:
                # LLM fallback generator
                message = llm.generate_response(user_query, {"intent": intent, "entities": entities})

        if not message:
            message = llm.generate_response(user_query, {"intent": intent, "entities": entities})

        return {
            "message": message,
            "detected_intent": intent,
            "confidence": confidence,
            "entities": entities,
            "action": action,
            "cards": cards,
            "safety_flag": False
        }

assistant_orchestrator = AIAssistantOrchestrator()
