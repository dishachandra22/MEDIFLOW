from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Date, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text)
    floor = Column(String)
    room_number = Column(String)
    code = Column(String, unique=True)

    doctors = relationship("Doctor", back_populates="department")


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    specialization = Column(String)
    qualification = Column(String)
    experience_years = Column(Integer)
    rating = Column(Float, default=4.8)
    bio = Column(Text)
    room_number = Column(String)

    department = relationship("Department", back_populates="doctors")
    time_slots = relationship("TimeSlot", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor")
    medical_records = relationship("MedicalRecord", back_populates="doctor")


class TimeSlot(Base):
    __tablename__ = "time_slots"

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    slot_date = Column(Date, index=True)
    slot_time = Column(String)  # e.g. "10:30 AM"
    is_booked = Column(Boolean, default=False)

    doctor = relationship("Doctor", back_populates="time_slots")
    appointment = relationship("Appointment", back_populates="slot", uselist=False)


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    gender = Column(String)
    phone = Column(String)
    email = Column(String)
    blood_group = Column(String)
    medical_history_summary = Column(Text)

    appointments = relationship("Appointment", back_populates="patient")
    medical_records = relationship("MedicalRecord", back_populates="patient")


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    slot_id = Column(Integer, ForeignKey("time_slots.id"), nullable=True)
    appointment_date = Column(Date)
    appointment_time = Column(String)
    status = Column(String, default="Confirmed")  # Scheduled, Confirmed, Completed, Cancelled
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")
    slot = relationship("TimeSlot", back_populates="appointment")


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=True)
    record_date = Column(Date)
    department_name = Column(String)
    visit_type = Column(String)  # Consultation, Lab Test, Follow-up, Routine Checkup
    chief_complaint = Column(Text)
    doctor_notes = Column(Text)
    lab_results = Column(Text)
    follow_up_date = Column(Date, nullable=True)

    patient = relationship("Patient", back_populates="medical_records")
    doctor = relationship("Doctor", back_populates="medical_records")


class HospitalLocation(Base):
    __tablename__ = "hospital_locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    department_name = Column(String)
    floor = Column(String)  # Ground Floor, First Floor, Second Floor
    room_number = Column(String)
    landmark = Column(String)
    directions = Column(Text)
    building = Column(String, default="Main Block")


class KnowledgeBaseArticle(Base):
    __tablename__ = "knowledge_base"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)
    question = Column(String)
    answer = Column(Text)
    keywords = Column(String)  # comma separated keywords
