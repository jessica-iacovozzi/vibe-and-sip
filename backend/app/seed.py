"""Database seeding utilities."""

from __future__ import annotations

import argparse
import ast
import re
from pathlib import Path
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db import create_session
from app.models import AlcoholLevel, Cocktail, Difficulty, Occasion, Vibe


SeedConfig = dict[str, Any]
SeedData = dict[str, list[dict[str, Any]]]


def parse_args() -> SeedConfig:
    parser = argparse.ArgumentParser(description="Seed the Vibe & Sip database.")
    parser.add_argument("--database-url", dest="database_url", default=None)
    parsed = parser.parse_args()
    return {"database_url": parsed.database_url}


def resolve_database_url(config: SeedConfig) -> str | None:
    return config.get("database_url")


def get_seed_data_path() -> Path:
    repo_root = Path(__file__).resolve().parents[2]
    return repo_root / "frontend" / "src" / "data" / "seedData.ts"


def load_seed_data() -> SeedData:
    seed_source = get_seed_data_path().read_text(encoding="utf-8")
    return {
        "vibes": parse_exported_array(seed_source, "vibes"),
        "occasions": parse_exported_array(seed_source, "occasions"),
        "difficulties": parse_exported_array(seed_source, "difficulties"),
        "alcoholLevels": parse_exported_array(seed_source, "alcoholLevels"),
        "cocktails": parse_exported_array(seed_source, "cocktails"),
    }


def parse_exported_array(seed_source: str, export_name: str) -> list[dict[str, Any]]:
    bracket_start = seed_source.find("[", seed_source.find(f"export const {export_name}"))
    if bracket_start == -1:
        raise ValueError(f"Seed export not found: {export_name}")
    bracket_end = find_matching_bracket(seed_source, bracket_start)
    array_literal = seed_source[bracket_start : bracket_end + 1]
    normalized = normalize_ts_literal(array_literal)
    return ast.literal_eval(normalized)


def find_matching_bracket(source: str, start_index: int) -> int:
    depth = 0
    for offset, char in enumerate(source[start_index:], start=0):
        if char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return start_index + offset
    raise ValueError("Unmatched bracket in seed data.")


def normalize_ts_literal(value: str) -> str:
    normalized = re.sub(r"\btrue\b", "True", value)
    normalized = re.sub(r"\bfalse\b", "False", normalized)
    normalized = re.sub(r"\bnull\b", "None", normalized)
    normalized = re.sub(r"([,{]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', normalized)
    return normalized.replace("'", '"')


def insert_seed_data(session: Session, seed_data: SeedData) -> None:
    vibes = upsert_entities(session, Vibe, seed_data["vibes"])
    occasions = upsert_entities(session, Occasion, seed_data["occasions"])
    difficulties = upsert_entities(session, Difficulty, seed_data["difficulties"])
    alcohol_levels = upsert_entities(session, AlcoholLevel, seed_data["alcoholLevels"])
    session.flush()

    insert_cocktails(session, seed_data["cocktails"], vibes, occasions, difficulties, alcohol_levels)


def upsert_entities(
    session: Session,
    model: type[Vibe | Occasion | Difficulty | AlcoholLevel],
    payloads: list[dict[str, Any]],
) -> dict[str, Any]:
    entities: dict[str, Any] = {}
    for payload in payloads:
        entity = session.get(model, payload["id"])
        if entity is None:
            entity = model(**payload)
            session.add(entity)
        else:
            for key, value in payload.items():
                setattr(entity, key, value)
        entities[payload["id"]] = entity
    return entities


def insert_cocktails(
    session: Session,
    payloads: list[dict[str, Any]],
    vibe_map: dict[str, Vibe],
    occasion_map: dict[str, Occasion],
    difficulty_map: dict[str, Difficulty],
    alcohol_map: dict[str, AlcoholLevel],
) -> None:
    for payload in payloads:
        cocktail = session.get(Cocktail, payload["id"])
        if cocktail is None:
            cocktail = Cocktail(id=payload["id"])
            session.add(cocktail)
        apply_cocktail_fields(cocktail, payload)
        cocktail.vibes = [vibe_map[vibe_id] for vibe_id in payload["vibeIds"]]
        cocktail.occasions = [occasion_map[occasion_id] for occasion_id in payload["occasionIds"]]
        cocktail.difficulty = difficulty_map[payload["difficultyId"]]
        cocktail.alcohol_level = alcohol_map[payload["alcoholLevelId"]]


def apply_cocktail_fields(cocktail: Cocktail, payload: dict[str, Any]) -> None:
    cocktail.name = payload["name"]
    cocktail.description = payload["description"]
    cocktail.ingredients = payload["ingredients"]
    cocktail.steps = payload["steps"]
    cocktail.difficulty_id = payload["difficultyId"]
    cocktail.alcohol_level_id = payload["alcoholLevelId"]


def collect_seed_check_errors(session: Session, seed_data: SeedData) -> list[str]:
    checks = [
        (Vibe, seed_data["vibes"]),
        (Occasion, seed_data["occasions"]),
        (Difficulty, seed_data["difficulties"]),
        (AlcoholLevel, seed_data["alcoholLevels"]),
        (Cocktail, seed_data["cocktails"]),
    ]
    errors: list[str] = []
    for model, payloads in checks:
        expected_ids = {payload["id"] for payload in payloads}
        actual_ids = set(session.execute(select(model.id)).scalars().all())
        missing_ids = expected_ids - actual_ids
        if missing_ids:
            errors.append(f"Missing {model.__tablename__} IDs: {sorted(missing_ids)}")
        expected_count = len(expected_ids)
        actual_count = session.execute(select(func.count()).select_from(model)).scalar_one()
        if actual_count < expected_count:
            errors.append(
                f"{model.__tablename__} count {actual_count} is less than expected {expected_count}"
            )
    return errors


def run_seed(config: SeedConfig) -> int:
    session = create_session(resolve_database_url(config))
    try:
        seed_data = load_seed_data()
        insert_seed_data(session, seed_data)
        errors = collect_seed_check_errors(session, seed_data)
        if errors:
            raise ValueError("; ".join(errors))
        session.commit()
        print("Seed successful: all entities inserted and verified.")
        return 0
    except Exception:
        print("Seed failed: see error details above.")
        session.rollback()
        raise
    finally:
        session.close()


def main() -> None:
    run_seed(parse_args())


if __name__ == "__main__":
    main()
