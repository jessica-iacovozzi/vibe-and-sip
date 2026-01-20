"""SQLAlchemy models for Vibe & Sip."""

from __future__ import annotations

from sqlalchemy import JSON, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from app.db import Base

cocktail_vibes = Table(
    "cocktail_vibes",
    Base.metadata,
    Column("cocktail_id", ForeignKey("cocktails.id"), primary_key=True),
    Column("vibe_id", ForeignKey("vibes.id"), primary_key=True),
)

cocktail_occasions = Table(
    "cocktail_occasions",
    Base.metadata,
    Column("cocktail_id", ForeignKey("cocktails.id"), primary_key=True),
    Column("occasion_id", ForeignKey("occasions.id"), primary_key=True),
)


class Vibe(Base):
    __tablename__ = "vibes"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    icon = Column(String, nullable=True)

    cocktails = relationship("Cocktail", secondary=cocktail_vibes, back_populates="vibes")


class Occasion(Base):
    __tablename__ = "occasions"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)

    cocktails = relationship("Cocktail", secondary=cocktail_occasions, back_populates="occasions")


class Difficulty(Base):
    __tablename__ = "difficulties"

    id = Column(String, primary_key=True)
    label = Column(String, nullable=False)
    rank = Column(Integer, nullable=False)

    cocktails = relationship("Cocktail", back_populates="difficulty")


class AlcoholLevel(Base):
    __tablename__ = "alcohol_levels"

    id = Column(String, primary_key=True)
    label = Column(String, nullable=False)
    rank = Column(Integer, nullable=False)

    cocktails = relationship("Cocktail", back_populates="alcohol_level")


class Cocktail(Base):
    __tablename__ = "cocktails"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    rank = Column(Integer, nullable=False, default=0)
    ingredients = Column(JSON, nullable=False)
    steps = Column(JSON, nullable=False)
    difficulty_id = Column(String, ForeignKey("difficulties.id"), nullable=False)
    alcohol_level_id = Column(String, ForeignKey("alcohol_levels.id"), nullable=False)

    difficulty = relationship("Difficulty", back_populates="cocktails")
    alcohol_level = relationship("AlcoholLevel", back_populates="cocktails")
    vibes = relationship("Vibe", secondary=cocktail_vibes, back_populates="cocktails")
    occasions = relationship("Occasion", secondary=cocktail_occasions, back_populates="cocktails")
