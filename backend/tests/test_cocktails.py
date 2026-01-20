"""Cocktails endpoint tests."""

from __future__ import annotations

from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import main as main_module
from app.db import Base
from app.main import app
from app.models import AlcoholLevel, Cocktail, Difficulty, Occasion, Vibe


def create_session_factory() -> sessionmaker:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        future=True,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine, future=True)


def seed_cocktail(session_factory: sessionmaker) -> None:
    session = session_factory()
    try:
        vibe = Vibe(id="vibe-test", name="Test Vibe", description="Test vibe", icon=None)
        occasion = Occasion(
            id="occasion-test",
            name="Test Occasion",
            description="Test occasion",
        )
        difficulty = Difficulty(id="difficulty-balanced", label="Balanced", rank=2)
        alcohol = AlcoholLevel(id="alcohol-light", label="Light", rank=1)
        cocktail = Cocktail(
            id="cocktail-test",
            name="Test Cocktail",
            description="Test description",
            ingredients=["ice"],
            steps=["mix"],
            difficulty_id=difficulty.id,
            alcohol_level_id=alcohol.id,
            rank=1,
        )
        cocktail.vibes = [vibe]
        cocktail.occasions = [occasion]
        cocktail.difficulty = difficulty
        cocktail.alcohol_level = alcohol

        session.add_all([vibe, occasion, difficulty, alcohol, cocktail])
        session.commit()
    finally:
        session.close()


def test_list_cocktails_filtered(monkeypatch: pytest.MonkeyPatch) -> None:
    session_factory = create_session_factory()
    seed_cocktail(session_factory)
    monkeypatch.setattr(main_module, "create_session", session_factory)

    client = TestClient(app)
    response = client.get(
        "/cocktails?vibe=vibe-test&difficulty=difficulty-balanced&page=1&limit=12"
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] == 1
    assert payload["items"] == [
        {
            "id": "cocktail-test",
            "name": "Test Cocktail",
            "description": "Test description",
            "imageUrl": None,
        }
    ]


def test_list_cocktails_empty(monkeypatch: pytest.MonkeyPatch) -> None:
    session_factory = create_session_factory()
    seed_cocktail(session_factory)
    monkeypatch.setattr(main_module, "create_session", session_factory)

    client = TestClient(app)
    response = client.get(
        "/cocktails?vibe=vibe-missing&difficulty=difficulty-balanced&page=1&limit=12"
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["items"] == []
    assert payload["total"] == 0
