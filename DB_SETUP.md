# Setup SQL local (SQLite + PostgreSQL)

## 1) Runtime local immédiat
- L'app API utilise SQLite (`node:sqlite`) via `lib/server/db.ts`.
- La base locale est créée automatiquement dans `data/cartzone.db` au premier appel API.

Endpoints:
- `GET /api/products`
- `POST /api/orders`

## 2) Synchronisation PostgreSQL
Schéma SQL et seed PostgreSQL disponibles ici:
- `db/postgres/schema.sql`
- `db/postgres/seed.sql`

### Lancer PostgreSQL en local
```bash
./scripts/db-local.sh up
./scripts/db-local.sh schema
./scripts/db-local.sh seed
```

### Variables de connexion (suggestion)
- `postgres://cartzone:cartzone@localhost:5432/cartzone`

> Le schéma SQL est conçu pour être facilement synchronisable vers PostgreSQL en local.
