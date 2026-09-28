import re
from typing import Dict, Any

MEDICAL_TRIGGER_PATTERNS = [
    r"\b(what|do i have|could it be)\b.*\b(disease|condition|illness|cancer|infection|disorder|attack|stroke|tumor)\b",
    r"\b(what|which)\b.*\b(medicine|medication|drug|pill|dosage|cure|treatment|remedy)\b.*\b(take|use|prescribe|for)\b",
    r"\b(why|what does it mean|is it dangerous|am i dying)\b.*\b(chest pain|headache|fever|cough|shortness of breath|bleeding|dizziness|nausea|rash)\b",
    r"\b(diagnose|diagnosis|symptoms of|how to cure|how to treat|what should i take)\b",
    r"\b(chest pain|heart attack symptoms|stroke symptoms)\b",
    r"\b(what disease|what illness|what infection)\b"
]

SAFE_REFUSAL_MESSAGE = (
    "I am an AI Administrative Hospital Assistant designed to help with appointment bookings, hospital navigation, "
    "and general department queries. **I do not diagnose medical conditions, interpret symptoms, or prescribe medication.**\n\n"
    "If you are experiencing severe symptoms such as sudden chest pain, difficulty breathing, or high fever, "
    "please visit our **Emergency Department immediately (Ground Floor)** or call our 24/7 Emergency Helpline: **+91 1800-999-0000**.\n\n"
    "Would you like me to assist you in booking an urgent appointment with one of our specialists?"
)

PERSISTENT_SAFETY_DISCLAIMER = (
    "I provide hospital information and administrative assistance. I do not diagnose medical conditions or replace a healthcare professional."
)

class SafetyChecker:
    def check_query(self, query: str) -> Dict[str, Any]:
        normalized = query.lower().strip()
        
        # Check against trigger regex patterns
        for pattern in MEDICAL_TRIGGER_PATTERNS:
            if re.search(pattern, normalized):
                return {
                    "is_safe": False,
                    "refusal_message": SAFE_REFUSAL_MESSAGE,
                    "disclaimer": PERSISTENT_SAFETY_DISCLAIMER,
                    "suggested_action": "Emergency Contact & Specialist Appointment"
                }

        return {
            "is_safe": True,
            "refusal_message": None,
            "disclaimer": PERSISTENT_SAFETY_DISCLAIMER
        }

safety_checker = SafetyChecker()
