"""Database engine and session helpers."""

from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.health import get_database_url

Base = declarative_base()


def build_engine(database_url: str) -> Engine:
    return create_engine(database_url, pool_pre_ping=True, future=True)


def resolve_database_url(database_url: str | None = None) -> str:
    resolved_url = database_url or get_database_url()
    if not resolved_url:
        raise ValueError("DATABASE_URL is required for database access.")
    return resolved_url


def create_session(database_url: str | None = None) -> Session:
    engine = build_engine(resolve_database_url(database_url))
    session_factory = sessionmaker(bind=engine, future=True)
    return session_factory()
