"""FastAPI application entrypoint for Vibe & Sip API."""

from fastapi import FastAPI, HTTPException
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError

from app.db import create_session
from app.health import get_dependency_statuses, get_overall_status
from app.models import Vibe

app = FastAPI(title="Vibe & Sip API")


def serialize_vibe(vibe: Vibe) -> dict[str, str | None | list[str]]:
    return {
        "id": vibe.id,
        "name": vibe.name,
        "description": vibe.description,
        "imageUrl": vibe.icon,
        "tags": [],
    }


@app.get("/health")
def health() -> dict[str, str]:
    dependency_statuses = get_dependency_statuses()
    return get_overall_status(dependency_statuses)


@app.get("/vibes")
def list_vibes() -> list[dict[str, str | None | list[str]]]:
    try:
        with create_session() as session:
            vibes = session.execute(select(Vibe).order_by(Vibe.name)).scalars().all()
        return [serialize_vibe(vibe) for vibe in vibes]
    except SQLAlchemyError as error:
        raise HTTPException(status_code=500, detail=f"Failed to load vibes: {error}") from error
