"""FastAPI application entrypoint for Vibe & Sip."""

from fastapi import FastAPI

from app.health import get_dependency_statuses, get_overall_status

app = FastAPI(title="Vibe & Sip API")


@app.get("/health")
def health() -> dict[str, str]:
    dependency_statuses = get_dependency_statuses()
    return get_overall_status(dependency_statuses)
