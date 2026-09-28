import re
from typing import Dict, Any, List

SYNONYM_MAP = {
    "Dermatology": ["skin specialist", "dermatologist", "skin", "eczema", "acne", "rash", "dermatology"],
    "Cardiology": ["heart specialist", "cardiologist", "heart", "cardio", "blood pressure", "palpitation", "cardiology"],
    "Orthopedics": ["bone specialist", "orthopedic", "bones", "fracture", "joint", "knee pain", "spine", "orthopedics"],
    "Pediatrics": ["child specialist", "pediatrician", "kids", "child health", "baby", "infant", "pediatrics"],
    "Neurology": ["brain specialist", "neurologist", "nerves", "migraine", "brain", "neurology"],
    "ENT": ["ear nose throat", "ent specialist", "sinus", "hearing", "throat", "ear", "ent"],
    "General Medicine": ["general physician", "fever", "routine checkup", "physician", "general doctor", "medicine"],
    "Radiology": ["x-ray", "mri", "ct scan", "ultrasound", "imaging", "radiology", "scan"]
}

TIME_PATTERNS = {
    "today": [r"\btoday\b", r"\bthis afternoon\b", r"\bthis evening\b"],
    "tomorrow": [r"\btomorrow\b", r"\bnext day\b"],
    "this_week": [r"\bthis week\b", r"\bupcoming days\b", r"\bthis weekend\b", r"\bnext week\b"]
}

INTENT_KEYWORDS = {
    "Appointment Booking": [
        r"\bbook\b", r"\bschedule\b", r"\breserve\b", r"\bmake an appointment\b",
        r"\bconsultation booking\b", r"\bwant to see\b", r"\bneed to see\b", r"\bconsult\b"
    ],
    "Appointment Status": [
        r"\bmy appointment\b", r"\bnext appointment\b", r"\bstatus of appointment\b",
        r"\bwhen is my\b", r"\bbooked slots\b", r"\bupcoming appointment\b", r"\bmy bookings\b"
    ],
    "Doctor Search": [
        r"\bavailable doctors\b", r"\bdoctors available\b", r"\bfind doctor\b",
        r"\blist doctors\b", r"\bwho is available\b", r"\bspecialist available\b",
        r"\bneed to see a\b", r"\bconsult a\b", r"\blooking for a doctor\b"
    ],
    "Department Search": [
        r"\bdepartment\b", r"\bwhich floor\b", r"\bspecialty\b", r"\bdepartments list\b", r"\bbranches\b"
    ],
    "Hospital Information": [
        r"\bvisiting hours\b", r"\btimings\b", r"\bdocuments\b", r"\bregistration\b",
        r"\bemergency number\b", r"\bhelpline\b", r"\bopening hours\b", r"\bpharmacy hours\b"
    ],
    "Patient Record Summary": [
        r"\bsummarize\b", r"\bsummary\b", r"\bmy records\b", r"\bmedical history\b",
        r"\brecent visits\b", r"\brecent appointments\b", r"\breports summary\b"
    ]
}

class IntentDetector:
    def detect(self, query: str) -> Dict[str, Any]:
        normalized = query.lower().strip()
        
        # 1. Extract Department Entity via Synonym Map
        detected_department = None
        for dept_name, synonyms in SYNONYM_MAP.items():
            for syn in synonyms:
                if syn in normalized:
                    detected_department = dept_name
                    break
            if detected_department:
                break

        # 2. Extract Time Preference Entity
        detected_time = None
        for time_key, patterns in TIME_PATTERNS.items():
            for pat in patterns:
                if re.search(pat, normalized):
                    detected_time = time_key
                    break
            if detected_time:
                break

        # 3. Intent Scoring
        scores = {}
        for intent_name, patterns in INTENT_KEYWORDS.items():
            score = 0
            for pat in patterns:
                if re.search(pat, normalized):
                    score += 1
            if score > 0:
                scores[intent_name] = score

        primary_intent = "General Hospital Assistance"
        confidence = 0.75

        if scores:
            top_intent = max(scores, key=scores.get)
            top_score = scores[top_intent]
            primary_intent = top_intent
            confidence = min(0.98, 0.80 + (top_score * 0.08))
        elif detected_department:
            # If user asks e.g. "I need to see a skin specialist", score high on Doctor Search
            primary_intent = "Doctor Search"
            confidence = 0.92
        elif "where" in normalized or "location" in normalized or "floor" in normalized:
            primary_intent = "Hospital Information"
            confidence = 0.88

        # 4. Refine entity requirements description
        requirement = query
        if detected_department:
            requirement = f"Consultation with {detected_department} specialist"
        elif "document" in normalized or "register" in normalized:
            requirement = "Registration and Documentation Policy"
        elif "summary" in normalized:
            requirement = "Patient Medical Record Overview"

        entities = {
            "department": detected_department,
            "time_preference": detected_time or "anytime",
            "requirement": requirement
        }

        return {
            "intent": primary_intent,
            "confidence": round(confidence, 2),
            "entities": entities
        }

intent_detector = IntentDetector()
