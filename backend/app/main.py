"""FastAPI application entrypoint for Vibe & Sip API."""

from fastapi import FastAPI, HTTPException, Query
from sqlalchemy import func, select
import sqlalchemy as sa
from sqlalchemy.exc import SQLAlchemyError

from app.db import create_session
from app.health import get_dependency_statuses, get_overall_status
from app.models import Cocktail, Occasion, Vibe

DEFAULT_PAGE = 1
DEFAULT_LIMIT = 12
DEFAULT_DIFFICULTY = "difficulty-balanced"

app = FastAPI(title="Vibe & Sip API")


def serialize_vibe(vibe: Vibe) -> dict[str, str | None | list[str]]:
    return {
        "id": vibe.id,
        "name": vibe.name,
        "description": vibe.description,
        "imageUrl": vibe.icon,
        "tags": [],
    }


def serialize_cocktail(cocktail: Cocktail) -> dict[str, str | None]:
    return {
        "id": cocktail.id,
        "name": cocktail.name,
        "description": cocktail.description,
        "imageUrl": getattr(cocktail, "image_url", None),
    }


def serialize_cocktail_detail(cocktail: Cocktail) -> dict[str, object]:
    """Return cocktail detail payload with ingredients, steps, and tag groups."""
    tags = cocktail.tags or {}
    return {
        "id": cocktail.id,
        "name": cocktail.name,
        "description": cocktail.description,
        "imageUrl": getattr(cocktail, "image_url", None),
        "ingredients": cocktail.ingredients,
        "steps": cocktail.steps,
        "glassware": cocktail.glassware,
        "garnish": cocktail.garnish,
        "tags": {
            "spirit": tags.get("spirit", []),
            "flavor": tags.get("flavor", []),
        },
    }


def resolve_page(value: int) -> int:
    return value if value > 0 else DEFAULT_PAGE


def resolve_limit(value: int) -> int:
    return value if value > 0 else DEFAULT_LIMIT


def build_cocktails_query(
    vibe_id: str,
    difficulty_id: str,
    occasion_id: str,
):
    query = select(Cocktail)

    if vibe_id:
        query = query.join(Cocktail.vibes).where(Vibe.id == vibe_id)

    if occasion_id:
        query = query.join(Cocktail.occasions).where(Occasion.id == occasion_id)

    if difficulty_id:
        query = query.where(Cocktail.difficulty_id == difficulty_id)

    return query.order_by(Cocktail.rank.asc(), Cocktail.name.asc())


def build_cocktails_count_query(
    vibe_id: str,
    difficulty_id: str,
    occasion_id: str,
):
    query = select(func.count(sa.distinct(Cocktail.id))).select_from(Cocktail)

    if vibe_id:
        query = query.join(Cocktail.vibes).where(Vibe.id == vibe_id)

    if occasion_id:
        query = query.join(Cocktail.occasions).where(Occasion.id == occasion_id)

    if difficulty_id:
        query = query.where(Cocktail.difficulty_id == difficulty_id)

    return query


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


@app.get("/cocktails")
def list_cocktails(
    vibe: str = "",
    occasion: str = "",
    difficulty: str = DEFAULT_DIFFICULTY,
    page: int = Query(DEFAULT_PAGE, ge=1),
    limit: int = Query(DEFAULT_LIMIT, ge=1),
) -> dict[str, object]:
    try:
        with create_session() as session:
            resolved_page = resolve_page(page)
            resolved_limit = resolve_limit(limit)
            query = build_cocktails_query(vibe, difficulty, occasion)
            total = session.execute(
                build_cocktails_count_query(vibe, difficulty, occasion)
            ).scalar()
            results = (
                session.execute(
                    query.offset((resolved_page - 1) * resolved_limit).limit(resolved_limit)
                )
                .scalars()
                .all()
            )

        return {
            "items": [serialize_cocktail(cocktail) for cocktail in results],
            "page": resolved_page,
            "limit": resolved_limit,
            "total": total or 0,
        }
    except SQLAlchemyError as error:
        raise HTTPException(status_code=500, detail=f"Failed to load cocktails: {error}") from error


@app.get("/cocktails/{cocktail_id}")
def get_cocktail_detail(cocktail_id: str) -> dict[str, object]:
    try:
        with create_session() as session:
            cocktail = session.get(Cocktail, cocktail_id)
        if cocktail is None:
            raise HTTPException(
                status_code=404, detail=f"Cocktail with id '{cocktail_id}' not found."
            )
        return serialize_cocktail_detail(cocktail)
    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=500, detail=f"Failed to load cocktail detail: {error}"
        ) from error
