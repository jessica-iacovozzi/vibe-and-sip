"""Health endpoint tests."""

import pytest
from fastapi.testclient import TestClient

from app import main as main_module
from app.main import app

client = TestClient(app)


def test_health_ok() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_degraded(monkeypatch: pytest.MonkeyPatch) -> None:
    def fake_dependency_statuses() -> dict[str, bool]:
        return {"database": False}

    monkeypatch.setattr(main_module, "get_dependency_statuses", fake_dependency_statuses)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "degraded"}
