#!/usr/bin/env bash
set -euo pipefail

CMD=${1:-help}

case "$CMD" in
  up)
    docker compose up -d postgres
    ;;
  down)
    docker compose down
    ;;
  schema)
    docker compose exec -T postgres psql -U cartzone -d cartzone -f /workspace/db/postgres/schema.sql
    ;;
  seed)
    docker compose exec -T postgres psql -U cartzone -d cartzone -f /workspace/db/postgres/seed.sql
    ;;
  reset)
    docker compose exec -T postgres psql -U cartzone -d cartzone -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
    docker compose exec -T postgres psql -U cartzone -d cartzone -f /workspace/db/postgres/schema.sql
    docker compose exec -T postgres psql -U cartzone -d cartzone -f /workspace/db/postgres/seed.sql
    ;;
  *)
    echo "Usage: $0 {up|down|schema|seed|reset}"
    exit 1
    ;;
esac
