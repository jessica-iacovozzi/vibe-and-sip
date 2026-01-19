"""Vibes endpoint tests."""

from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient
import pytest

from app import main as main_module
from app.db import Base
from app.main import app
from app.models import Vibe


def create_session_factory() -> sessionmaker:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        future=True,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine, future=True)


def seed_vibes(session_factory: sessionmaker) -> None:
    session = session_factory()
    try:
        session.add(
            Vibe(
                id="vibe-test",
                name="Test Vibe",
                description="Test vibe description.",
                icon="spark",
            )
        )
        session.commit()
    finally:
        session.close()


def test_list_vibes_shape(monkeypatch: pytest.MonkeyPatch) -> None:
    session_factory = create_session_factory()
    seed_vibes(session_factory)

    monkeypatch.setattr(main_module, "create_session", session_factory)

    client = TestClient(app)
    response = client.get("/vibes")

    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload, list)
    assert payload == [
        {
            "id": "vibe-test",
            "name": "Test Vibe",
            "description": "Test vibe description.",
            "imageUrl": "spark",
            "tags": [],
        }
    ]
