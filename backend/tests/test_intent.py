import pytest
from ai.intent_detector import intent_detector

def test_intent_detection_cardiology():
    query = "I need to see a cardiologist"
    res = intent_detector.detect(query)
    assert res["intent"] in ["Doctor Search", "Appointment Booking"]
    assert res["entities"]["department"] == "Cardiology"
    assert res["confidence"] >= 0.80

def test_intent_detection_dermatology_synonym():
    query = "I need to see a skin specialist"
    res = intent_detector.detect(query)
    assert res["entities"]["department"] == "Dermatology"
    assert res["confidence"] >= 0.80

def test_intent_detection_appointment_status():
    query = "When is my next appointment?"
    res = intent_detector.detect(query)
    assert res["intent"] == "Appointment Status"
    assert res["confidence"] >= 0.80

def test_intent_detection_summarize_records():
    query = "Summarize my recent appointments"
    res = intent_detector.detect(query)
    assert res["intent"] == "Patient Record Summary"
    assert res["confidence"] >= 0.80
