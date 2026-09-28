from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import date, datetime

class DepartmentSchema(BaseModel):
    id: int
    name: str
    description: str
    floor: str
    room_number: str
    code: str

    class Config:
        from_attributes = True

class DoctorSchema(BaseModel):
    id: int
    name: str
    department_id: int
    specialization: str
    qualification: str
    experience_years: int
    rating: float
    bio: str
    room_number: str
    department_name: Optional[str] = None

    class Config:
        from_attributes = True

class TimeSlotSchema(BaseModel):
    id: int
    doctor_id: int
    slot_date: date
    slot_time: str
    is_booked: bool

    class Config:
        from_attributes = True

class PatientSchema(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    phone: str
    email: str
    blood_group: str
    medical_history_summary: str

    class Config:
        from_attributes = True

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    slot_id: Optional[int] = None
    appointment_date: str
    appointment_time: str
    reason: Optional[str] = "General Consultation"

class AppointmentSchema(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    slot_id: Optional[int] = None
    appointment_date: date
    appointment_time: str
    status: str
    reason: str
    created_at: datetime
    doctor_name: Optional[str] = None
    department_name: Optional[str] = None
    patient_name: Optional[str] = None

    class Config:
        from_attributes = True

class MedicalRecordSchema(BaseModel):
    id: int
    patient_id: int
    doctor_id: Optional[int] = None
    record_date: date
    department_name: str
    visit_type: str
    chief_complaint: str
    doctor_notes: str
    lab_results: str
    follow_up_date: Optional[date] = None
    doctor_name: Optional[str] = None

    class Config:
        from_attributes = True

class NavigationResponse(BaseModel):
    room_name: str
    department_name: str
    floor: str
    room_number: str
    landmark: str
    directions: str
    building: str

class FAQItemSchema(BaseModel):
    id: int
    category: str
    question: str
    answer: str
    source: str = "Hospital Knowledge Base"

class ChatRequest(BaseModel):
    message: str
    patient_id: Optional[int] = 1

class ChatResponse(BaseModel):
    message: str
    detected_intent: str
    confidence: float
    entities: Dict[str, Any]
    action: Optional[str] = None
    cards: List[Dict[str, Any]] = []
    safety_flag: bool = False
