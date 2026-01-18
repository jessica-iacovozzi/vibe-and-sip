"""Tests for seed utilities."""

from __future__ import annotations

from sqlalchemy import create_engine, func, select, text
from sqlalchemy.orm import Session, sessionmaker

from app.db import Base
from app.models import AlcoholLevel, Cocktail, Difficulty, Occasion, Vibe
from app.seed import collect_seed_check_errors, insert_seed_data, load_seed_data


def create_test_session() -> Session:
    engine = create_engine("sqlite+pysqlite:///:memory:", future=True)
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine, future=True)()


def get_count(session: Session, model: type[Base]) -> int:
    return session.execute(select(func.count()).select_from(model)).scalar_one()


def assert_counts_match_seed(session: Session, seed_data: dict[str, list[dict[str, object]]]) -> None:
    assert get_count(session, Vibe) == len(seed_data["vibes"])
    assert get_count(session, Occasion) == len(seed_data["occasions"])
    assert get_count(session, Difficulty) == len(seed_data["difficulties"])
    assert get_count(session, AlcoholLevel) == len(seed_data["alcoholLevels"])
    assert get_count(session, Cocktail) == len(seed_data["cocktails"])


def build_minimal_seed_data() -> dict[str, list[dict[str, object]]]:
    return {
        "vibes": [
            {
                "id": "vibe-test",
                "name": "Test Vibe",
                "description": "Test vibe description.",
                "icon": "spark",
            }
        ],
        "occasions": [
            {
                "id": "occasion-test",
                "name": "Test Occasion",
                "description": "Test occasion description.",
            }
        ],
        "difficulties": [{"id": "difficulty-test", "label": "Test", "rank": 1}],
        "alcoholLevels": [{"id": "alcohol-test", "label": "Test", "rank": 1}],
        "cocktails": [
            {
                "id": "cocktail-test",
                "name": "Test Cocktail",
                "description": "Test description.",
                "ingredients": ["ingredient"],
                "steps": ["step"],
                "difficultyId": "difficulty-test",
                "alcoholLevelId": "alcohol-test",
                "vibeIds": ["vibe-test"],
                "occasionIds": ["occasion-test"],
            }
        ],
    }


def test_seed_inserts_expected_counts() -> None:
    session = create_test_session()
    try:
        seed_data = load_seed_data()
        insert_seed_data(session, seed_data)
        session.commit()
        assert_counts_match_seed(session, seed_data)
    finally:
        session.close()


def test_validation_reports_missing_entities() -> None:
    session = create_test_session()
    try:
        seed_data = build_minimal_seed_data()
        insert_seed_data(session, seed_data)
        session.commit()

        vibe_id = session.execute(select(Vibe.id)).scalars().first()
        assert vibe_id is not None, "Expected at least one vibe to exist."
        session.execute(text("DELETE FROM vibes WHERE id = :vibe_id"), {"vibe_id": vibe_id})
        session.commit()

        errors = collect_seed_check_errors(session, seed_data)
        assert errors, "Expected validation errors when a vibe is missing."
    finally:
        session.close()


def test_seed_rerun_is_idempotent() -> None:
    session = create_test_session()
    try:
        seed_data = load_seed_data()
        insert_seed_data(session, seed_data)
        session.commit()
        assert_counts_match_seed(session, seed_data)

        insert_seed_data(session, seed_data)
        session.commit()
        assert_counts_match_seed(session, seed_data)
    finally:
        session.close()
