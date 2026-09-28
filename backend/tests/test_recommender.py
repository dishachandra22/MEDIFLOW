import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.seed import seed_database
from ai.recommender import recommender

@pytest.fixture(scope="module")
def db_session():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    seed_database(session)
    yield session
    session.close()

def test_recommend_cardiology_doctor(db_session):
    recs = recommender.recommend(db_session, department_name="Cardiology", time_preference="tomorrow")
    assert len(recs) > 0
    top_doc = recs[0]
    assert top_doc["department_name"] == "Cardiology"
    assert "why_recommended" in top_doc
    assert "recommended as a top-rated" in top_doc["why_recommended"]

def test_recommend_dermatology_doctor(db_session):
    recs = recommender.recommend(db_session, department_name="Dermatology")
    assert len(recs) > 0
    top_doc = recs[0]
    assert top_doc["department_name"] == "Dermatology"
