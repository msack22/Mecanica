#!/usr/bin/env sh
set -eu

PORT="${PORT:-7000}"
DOCS_DIR="${DOCS_DIR:-./docs}"

if [ ! -d "$DOCS_DIR" ]; then
  echo "Error: docs dir not found: $DOCS_DIR" >&2
  exit 1
fi

# On macOS, 7000 puede quedar ocupado por procesos del sistema (p.ej. AirTunes).
# En ese caso, cortamos lo que escucha en 7000 y levantamos de nuevo.
if command -v lsof >/dev/null 2>&1; then
  pid="$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
  if [ -n "$pid" ]; then
    echo "Port $PORT ocupado por PID=$pid; intentando liberar..."
    kill "$pid" >/dev/null 2>&1 || true
    sleep 0.2
  fi
fi

echo "Serving $DOCS_DIR on http://localhost:$PORT"
cd "$DOCS_DIR"
python3 -m http.server "$PORT"

