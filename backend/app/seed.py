from datetime import date, timedelta
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from .models import (
    Department, Doctor, TimeSlot, Patient, Appointment,
    MedicalRecord, HospitalLocation, KnowledgeBaseArticle
)

def seed_database(db: Session):
    # Check if DB is already seeded
    if db.query(Department).first() is not None:
        return

    today = date.today()
    tomorrow = today + timedelta(days=1)
    day_after = today + timedelta(days=2)
    next_week = today + timedelta(days=5)

    # 1. Departments (8 total)
    departments_data = [
        {"id": 1, "name": "Cardiology", "description": "Heart & vascular health, ECG, Angiography, Echo", "floor": "First Floor", "room_number": "102-105", "code": "CARD"},
        {"id": 2, "name": "Dermatology", "description": "Skin, hair, nail treatments and allergy care", "floor": "Second Floor", "room_number": "204-206", "code": "DERM"},
        {"id": 3, "name": "Orthopedics", "description": "Bone, joint, spine care, fractures & sports medicine", "floor": "Ground Floor", "room_number": "012-015", "code": "ORTH"},
        {"id": 4, "name": "Pediatrics", "description": "Child health, growth monitoring & immunizations", "floor": "Second Floor", "room_number": "210-214", "code": "PED"},
        {"id": 5, "name": "Neurology", "description": "Brain, nerve disorders, migraine & stroke care", "floor": "First Floor", "room_number": "110-112", "code": "NEUR"},
        {"id": 6, "name": "ENT", "description": "Ear, Nose, Throat care, sinus & hearing treatments", "floor": "Ground Floor", "room_number": "018-020", "code": "ENT"},
        {"id": 7, "name": "General Medicine", "description": "Primary healthcare, fever, diabetes & lifestyle management", "floor": "Ground Floor", "room_number": "005-008", "code": "GENM"},
        {"id": 8, "name": "Radiology", "description": "X-Ray, MRI, CT Scan, Ultrasound imaging services", "floor": "Ground Floor", "room_number": "001-004", "code": "RAD"}
    ]

    for dept in departments_data:
        db.add(Department(**dept))
    db.commit()

    # 2. Doctors (12 total)
    doctors_data = [
        # Cardiology
        {"id": 1, "name": "Dr. Ananya Rao", "department_id": 1, "specialization": "Senior Cardiologist", "qualification": "MD, DM (Cardiology)", "experience_years": 14, "rating": 4.9, "bio": "Expert in preventive cardiology, coronary interventions, and cardiac arrhythmia management.", "room_number": "102"},
        {"id": 2, "name": "Dr. Rajesh Sharma", "department_id": 1, "specialization": "Interventional Cardiologist", "qualification": "MD, DNB (Cardio)", "experience_years": 10, "rating": 4.8, "bio": "Specializes in echocardiography, angioplasty, and hypertension treatment.", "room_number": "103"},
        
        # Dermatology
        {"id": 3, "name": "Dr. Sneha Kapoor", "department_id": 2, "specialization": "Dermatologist & Skin Specialist", "qualification": "MD (Dermatology)", "experience_years": 9, "rating": 4.7, "bio": "Specialist in eczema, psoriasis, acne management, and cosmetic dermatology.", "room_number": "204"},
        {"id": 4, "name": "Dr. Vikram Seth", "department_id": 2, "specialization": "Trichologist & Dermatologist", "qualification": "MBBS, DVD", "experience_years": 11, "rating": 4.8, "bio": "Expert in hair loss therapies, skin allergy patch tests, and laser skin treatments.", "room_number": "205"},

        # Orthopedics
        {"id": 5, "name": "Dr. Rohan Verma", "department_id": 3, "specialization": "Orthopedic Surgeon", "qualification": "MS (Ortho), Fellowship in Joint Replacement", "experience_years": 15, "rating": 4.9, "bio": "Renowned joint replacement specialist, fracture surgeon, and sports injury expert.", "room_number": "012"},
        {"id": 6, "name": "Dr. Kavita Nair", "department_id": 3, "specialization": "Spine & Bone Specialist", "qualification": "MS (Ortho)", "experience_years": 8, "rating": 4.6, "bio": "Specializes in back pain management, arthritis, osteopathy, and rehabilitation.", "room_number": "013"},

        # Pediatrics
        {"id": 7, "name": "Dr. Amit Patel", "department_id": 4, "specialization": "Pediatrician", "qualification": "MD (Pediatrics)", "experience_years": 12, "rating": 4.9, "bio": "Compassionate pediatrician handling childhood vaccinations, growth tracking, and pediatric asthma.", "room_number": "210"},

        # Neurology
        {"id": 8, "name": "Dr. Meera Joshi", "department_id": 5, "specialization": "Neurologist", "qualification": "DM (Neurology)", "experience_years": 13, "rating": 4.8, "bio": "Expert in migraine management, epilepsy, peripheral neuropathy, and memory disorders.", "room_number": "110"},

        # ENT
        {"id": 9, "name": "Dr. Sanjay Deshmukh", "department_id": 6, "specialization": "ENT Specialist", "qualification": "MS (ENT)", "experience_years": 11, "rating": 4.7, "bio": "Expert in sinus surgeries, hearing loss evaluation, and throat infection treatment.", "room_number": "018"},

        # General Medicine
        {"id": 10, "name": "Dr. Priya Sundaram", "department_id": 7, "specialization": "General Physician", "qualification": "MD (General Medicine)", "experience_years": 10, "rating": 4.8, "bio": "Provides comprehensive adult health checks, diabetes care, and lifestyle disease management.", "room_number": "005"},
        {"id": 11, "name": "Dr. Arjun Gupta", "department_id": 7, "specialization": "Internal Medicine Physician", "qualification": "MBBS, MD", "experience_years": 7, "rating": 4.6, "bio": "Focuses on acute fever care, infectious diseases, and routine health evaluations.", "room_number": "006"},

        # Radiology
        {"id": 12, "name": "Dr. Sunita Reddy", "department_id": 8, "specialization": "Consultant Radiologist", "qualification": "MD (Radiodiagnosis)", "experience_years": 14, "rating": 4.9, "bio": "Specialist in ultrasound diagnostics, CT scan interpretations, and MRI imaging.", "room_number": "001"}
    ]

    for doc in doctors_data:
        db.add(Doctor(**doc))
    db.commit()

    # 3. Time Slots (across today, tomorrow, day_after, next_week)
    slot_times = ["09:00 AM", "10:30 AM", "11:45 AM", "02:00 PM", "03:30 PM", "05:00 PM"]
    dates = [today, tomorrow, day_after, next_week]
    
    time_slots_data = []
    slot_id_counter = 1

    for doc_id in range(1, 13):
        for d in dates:
            for st in slot_times:
                # Book a few slots randomly for variety
                is_booked = False
                if doc_id == 1 and d == tomorrow and st == "10:30 AM":
                    is_booked = True # Reserved for Varsha
                elif (doc_id + hash(st)) % 4 == 0:
                    is_booked = True
                
                time_slots_data.append({
                    "id": slot_id_counter,
                    "doctor_id": doc_id,
                    "slot_date": d,
                    "slot_time": st,
                    "is_booked": is_booked
                })
                slot_id_counter += 1

    for ts in time_slots_data:
        db.add(TimeSlot(**ts))
    db.commit()

    # 4. Patients (Primary: Varsha, + 9 sample patients)
    patients_data = [
        {"id": 1, "name": "Varsha", "age": 28, "gender": "Female", "phone": "+91 98765 43210", "email": "varsha.s@example.com", "blood_group": "O+", "medical_history_summary": "Mild hypertension under control, routine ECG normal, allergy to penicillin."},
        {"id": 2, "name": "Rohan Mehta", "age": 45, "gender": "Male", "phone": "+91 98123 45678", "email": "rohan.m@example.com", "blood_group": "A+", "medical_history_summary": "Type 2 Diabetes, quarterly HbA1c screening."},
        {"id": 3, "name": "Aarav Sharma", "age": 7, "gender": "Male", "phone": "+91 98234 56789", "email": "parents.aarav@example.com", "blood_group": "B+", "medical_history_summary": "Childhood asthma, annual pediatric checkups."},
        {"id": 4, "name": "Sunita Rao", "age": 62, "gender": "Female", "phone": "+91 98345 67890", "email": "sunita.r@example.com", "blood_group": "AB+", "medical_history_summary": "Knee osteoarthritis, post-physiotherapy evaluation."},
        {"id": 5, "name": "Karan Malhotra", "age": 34, "gender": "Male", "phone": "+91 98456 78901", "email": "karan.m@example.com", "blood_group": "O-", "medical_history_summary": "Chronic sinus infections, seasonal dust allergy."},
        {"id": 6, "name": "Neha Verma", "age": 31, "gender": "Female", "phone": "+91 98567 89012", "email": "neha.v@example.com", "blood_group": "A-", "medical_history_summary": "Eczema flare-ups, under dermatological care."},
        {"id": 7, "name": "Vikram Choudhury", "age": 50, "gender": "Male", "phone": "+91 98678 90123", "email": "vikram.c@example.com", "blood_group": "B-", "medical_history_summary": "Lumbar spine spondylosis."},
        {"id": 8, "name": "Pooja Hegde", "age": 25, "gender": "Female", "phone": "+91 98789 01234", "email": "pooja.h@example.com", "blood_group": "O+", "medical_history_summary": "Frequent migraines, neurological workup."},
        {"id": 9, "name": "Deepak Iyer", "age": 39, "gender": "Male", "phone": "+91 98890 12345", "email": "deepak.i@example.com", "blood_group": "AB-", "medical_history_summary": "Annual executive health screening."},
        {"id": 10, "name": "Ananya Nair", "age": 19, "gender": "Female", "phone": "+91 98901 23456", "email": "ananya.n@example.com", "blood_group": "A+", "medical_history_summary": "Acne vulgaris treatment, routine blood test."}
    ]

    for p in patients_data:
        db.add(Patient(**p))
    db.commit()

    # 5. Appointments
    # Varsha's upcoming appointment tomorrow with Dr. Ananya Rao
    appointments_data = [
        {
            "id": 1,
            "patient_id": 1,
            "doctor_id": 1,
            "slot_id": 2, # tomorrow 10:30 AM
            "appointment_date": tomorrow,
            "appointment_time": "10:30 AM",
            "status": "Confirmed",
            "reason": "Cardiology Follow-up & Routine Consultation"
        },
        {
            "id": 2,
            "patient_id": 1,
            "doctor_id": 3,
            "slot_id": None,
            "appointment_date": today - timedelta(days=14),
            "appointment_time": "11:45 AM",
            "status": "Completed",
            "reason": "Skin Allergy Consultation"
        },
        {
            "id": 3,
            "patient_id": 2,
            "doctor_id": 10,
            "slot_id": None,
            "appointment_date": today,
            "appointment_time": "09:00 AM",
            "status": "Confirmed",
            "reason": "Diabetes Quarterly Checkup"
        },
        {
            "id": 4,
            "patient_id": 3,
            "doctor_id": 7,
            "slot_id": None,
            "appointment_date": today,
            "appointment_time": "11:45 AM",
            "status": "Confirmed",
            "reason": "Pediatric Asthma Follow-up"
        },
        {
            "id": 5,
            "patient_id": 4,
            "doctor_id": 5,
            "slot_id": None,
            "appointment_date": tomorrow,
            "appointment_time": "02:00 PM",
            "status": "Confirmed",
            "reason": "Knee Joint Pain Review"
        },
        {
            "id": 6,
            "patient_id": 6,
            "doctor_id": 3,
            "slot_id": None,
            "appointment_date": today,
            "appointment_time": "03:30 PM",
            "status": "Confirmed",
            "reason": "Dermatology Routine Check"
        }
    ]

    for app in appointments_data:
        db.add(Appointment(**app))
    db.commit()

    # 6. Medical Records (Varsha's past records & others)
    records_data = [
        {
            "id": 1,
            "patient_id": 1,
            "doctor_id": 1,
            "record_date": today - timedelta(days=16),
            "department_name": "Cardiology",
            "visit_type": "Consultation",
            "chief_complaint": "Mild palpitation during strenuous exercise",
            "doctor_notes": "Vital signs stable. BP 122/80 mmHg. Normal heart sounds. Advised resting ECG and lipid profile test.",
            "lab_results": "ECG Report: Normal sinus rhythm (72 bpm). Total Cholesterol: 185 mg/dL (Normal). HDL: 52 mg/dL.",
            "follow_up_date": tomorrow
        },
        {
            "id": 2,
            "patient_id": 1,
            "doctor_id": 3,
            "record_date": today - timedelta(days=14),
            "department_name": "Dermatology",
            "visit_type": "Lab Test & Consultation",
            "chief_complaint": "Mild skin redness on forearm after environmental allergen exposure",
            "doctor_notes": "Patch test negative for contact dermatitis. Prescribed moisturizing barrier cream.",
            "lab_results": "Skin Patch Test: Negative for severe allergen antibodies.",
            "follow_up_date": None
        },
        {
            "id": 3,
            "patient_id": 2,
            "doctor_id": 10,
            "record_date": today - timedelta(days=30),
            "department_name": "General Medicine",
            "visit_type": "Routine Checkup",
            "chief_complaint": "Quarterly blood glucose monitoring",
            "doctor_notes": "Diabetes well-managed with current diet and medication routine.",
            "lab_results": "HbA1c: 6.4% (Good control). Fasting Blood Glucose: 110 mg/dL.",
            "follow_up_date": today
        },
        {
            "id": 4,
            "patient_id": 4,
            "doctor_id": 5,
            "record_date": today - timedelta(days=45),
            "department_name": "Orthopedics",
            "visit_type": "Consultation",
            "chief_complaint": "Right knee stiffness when climbing stairs",
            "doctor_notes": "Mild degenerative changes on knee X-Ray. Advised physical therapy exercises.",
            "lab_results": "X-Ray Right Knee: Grade 1 osteoarthritis.",
            "follow_up_date": tomorrow
        }
    ]

    for rec in records_data:
        db.add(MedicalRecord(**rec))
    db.commit()

    # 7. Hospital Locations (For Floor Map & Ask AI Navigation)
    locations_data = [
        {"id": 1, "name": "Reception", "department_name": "Administration", "floor": "Ground Floor", "room_number": "G-001", "landmark": "Main Entrance Lobby", "directions": "Directly opposite the main glass sliding doors upon entering.", "building": "Main Wing"},
        {"id": 2, "name": "Laboratory", "department_name": "Pathology", "floor": "Ground Floor", "room_number": "G-008", "landmark": "Near Central Reception", "directions": "Walk past the main reception counter, take the left hallway; Lab blood collection is on your right.", "building": "Main Wing"},
        {"id": 3, "name": "Radiology", "department_name": "Radiology", "floor": "Ground Floor", "room_number": "001-004", "landmark": "Near X-Ray Corridor", "directions": "Take the corridor on the far right of the ground floor past OPD counter 2.", "building": "Diagnostic Block"},
        {"id": 4, "name": "Pharmacy", "department_name": "Pharmacy", "floor": "Ground Floor", "room_number": "G-002", "landmark": "Next to Emergency Entrance", "directions": "Located immediately on the right side of the main lobby, next to registration.", "building": "Main Wing"},
        {"id": 5, "name": "Emergency", "department_name": "Emergency & Trauma", "floor": "Ground Floor", "room_number": "EMG-01", "landmark": "Ambulance Bay Entry", "directions": "Dedicated ground floor entrance on the north wing with 24/7 ramp access.", "building": "Emergency Block"},
        {"id": 6, "name": "Cardiology", "department_name": "Cardiology", "floor": "First Floor", "room_number": "102-105", "landmark": "Elevator B, First Floor", "directions": "Take Elevator B to the 1st Floor, turn left; Cardiology OPD is in Room 102.", "building": "Specialty Wing"},
        {"id": 7, "name": "Dermatology", "department_name": "Dermatology", "floor": "Second Floor", "room_number": "204-206", "landmark": "Staircase A, Second Floor", "directions": "Take Elevator A to the 2nd Floor, follow the blue sign to Room 204.", "building": "Specialty Wing"},
        {"id": 8, "name": "Orthopedics", "department_name": "Orthopedics", "floor": "Ground Floor", "room_number": "012-015", "landmark": "West Corridor Ground Floor", "directions": "Walk straight past the pharmacy into West Corridor; Room 012.", "building": "Main Wing"},
        {"id": 9, "name": "Pediatrics", "department_name": "Pediatrics", "floor": "Second Floor", "room_number": "210-214", "landmark": "Children's Play Area 2nd Floor", "directions": "Take Elevator B to the 2nd Floor, head right past the pediatric waiting hall.", "building": "Specialty Wing"},
        {"id": 10, "name": "Neurology", "department_name": "Neurology", "floor": "First Floor", "room_number": "110-112", "landmark": "East Wing First Floor", "directions": "Take Elevator A to the 1st Floor, walk straight to Room 110.", "building": "Specialty Wing"},
        {"id": 11, "name": "ENT", "department_name": "ENT", "floor": "Ground Floor", "room_number": "018-020", "landmark": "OPD Block Ground Floor", "directions": "Ground floor east wing, adjacent to General OPD.", "building": "Main Wing"}
    ]

    for loc in locations_data:
        db.add(HospitalLocation(**loc))
    db.commit()

    # 8. Knowledge Base Articles
    kb_data = [
        {
            "id": 1,
            "category": "Timings & Visiting Hours",
            "question": "What are the hospital visiting hours for inpatient wards?",
            "answer": "Visiting hours for general inpatient wards are from 04:00 PM to 07:00 PM daily. ICU visiting hours are strictly limited to 11:00 AM – 12:00 PM and 05:00 PM – 06:00 PM (1 visitor per patient).",
            "keywords": "visiting hours, timings, ward visit, visitor policy, icu timing"
        },
        {
            "id": 2,
            "category": "Registration & Documents",
            "question": "What documents do I need for hospital registration and first appointment?",
            "answer": "For initial hospital registration, please bring: 1) Government photo ID (Aadhaar, Passport, or Driving License), 2) Insurance card / policy details (if applicable), and 3) Previous medical records or prescriptions. New registration takes 5 minutes at the ground floor desk.",
            "keywords": "documents, registration, id proof, new patient, papers, required, register"
        },
        {
            "id": 3,
            "category": "OPD & Appointment Process",
            "question": "How do I book or reschedule an appointment?",
            "answer": "You can book appointments online using our AI Assistant, via the MediFlow mobile portal, or by calling the helpline at +91 1800-123-4567. Re-scheduling can be done up to 2 hours prior to the slot.",
            "keywords": "book appointment, reschedule, appointment process, online booking, helpline"
        },
        {
            "id": 4,
            "category": "Emergency & Support",
            "question": "What are the hospital emergency numbers and ambulance services?",
            "answer": "For medical emergencies, call our 24/7 Helpline: +91 1800-999-0000 or Trauma Center directly at +91 1800-999-1111. Free cardiac ambulance service is available within a 15 km radius.",
            "keywords": "emergency, ambulance, helpline, trauma, urgent, 24/7, casualty"
        },
        {
            "id": 5,
            "category": "Services & Facilities",
            "question": "Does the hospital have diagnostic laboratory and radiology services?",
            "answer": "Yes! Our 24/7 central laboratory and radiology center offer blood tests, MRI (3T), CT scans (128-slice), Digital X-Rays, and Ultrasound. Routine lab reports are delivered within 4 hours via the patient portal.",
            "keywords": "lab, laboratory, radiology, x-ray, mri, ct scan, blood test, diagnostics"
        },
        {
            "id": 6,
            "category": "Pharmacy & Billing",
            "question": "Where is the pharmacy located and what are its operating hours?",
            "answer": "The hospital pharmacy is located on the Ground Floor next to the main lobby and emergency entrance. It operates 24/7 and accepts cash, cards, and health insurance claim coverage.",
            "keywords": "pharmacy, medicines, drug store, billing, payment, insurance"
        }
    ]

    for kb in kb_data:
        db.add(KnowledgeBaseArticle(**kb))
    db.commit()

    print("Database successfully seeded with realistic healthcare demo data!")
