# Vibe & Sip Backend

## Local Database Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update `DATABASE_URL` as needed. Example:

```env
DATABASE_URL=postgresql+psycopg://postgres:password@localhost:5432/vibe_and_sip
```

3. Create the schema with Alembic:

```bash
poetry run alembic revision --autogenerate -m "create seed tables"
poetry run alembic upgrade head
```

4. Seed the database:

```bash
poetry run seed
```

## Tests

```bash
poetry run pytest
```
