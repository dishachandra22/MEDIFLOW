from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .seed import seed_database
from routes import chat, doctors, appointments, patients, navigation, faq, dashboard

# Create Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediFlow AI - Intelligent Hospital Management Assistant API",
    description="Backend REST API for AI-powered hospital operations, intent detection, doctor recommendations, navigation, and record summarization.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Automatically seed database on first startup
@app.on_event("startup")
def startup_db_seed():
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

# Include Routers
app.include_router(chat.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(patients.router)
app.include_router(navigation.router)
app.include_router(faq.router)
app.include_router(dashboard.router)

@app.get("/")
def root_endpoint():
    return {
        "status": "online",
        "app_name": "MediFlow AI Backend API",
        "version": "1.0.0",
        "documentation": "/docs"
    }
