"""Health check utilities for the API."""

import socket
from urllib.parse import urlparse

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from app.settings import get_settings


def get_database_url() -> str | None:
    return get_settings().DATABASE_URL


def run_database_probe(database_url: str) -> bool:
    engine = create_engine(database_url, pool_pre_ping=True)
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return True
    except (SQLAlchemyError, OSError):
        return False
    finally:
        engine.dispose()


def check_database(database_url: str | None = None) -> bool:
    resolved_url = database_url or get_database_url()
    if not resolved_url:
        return True
    return run_database_probe(resolved_url)


def get_cache_url() -> str | None:
    settings = get_settings()
    return settings.REDIS_URL or settings.CACHE_URL


def can_connect_to_cache(cache_url: str) -> bool:
    parsed = urlparse(cache_url)
    host = parsed.hostname
    port = parsed.port or (6379 if parsed.scheme in {"redis", "rediss"} else None)
    if not host or not port:
        return False
    try:
        with socket.create_connection((host, port), timeout=2):
            return True
    except OSError:
        return False


def check_cache(cache_url: str | None = None) -> bool:
    resolved_url = cache_url or get_cache_url()
    if not resolved_url:
        return True
    return can_connect_to_cache(resolved_url)


def get_dependency_statuses() -> dict[str, bool]:
    dependency_checks = {"database": check_database, "cache": check_cache}
    return {name: check() for name, check in dependency_checks.items()}


def get_overall_status(dependency_statuses: dict[str, bool]) -> dict[str, str]:
    is_healthy = all(dependency_statuses.values())
    status = "ok" if is_healthy else "degraded"
    return {"status": status}
