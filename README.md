# Crypto Signal Platform (Binance Spot Signals)

Includes:
- NestJS API (signals, scanner cron, MySQL history, backtest, WebSocket)
- Python FastAPI AI service (dummy model for starters)
- Next.js dashboard (live + history)
- Docker Compose (api + mysql + ai + dashboard)

## Quick start

1. Copy env:
   - `cp .env.example .env` (Windows: copy `.env.example` to `.env`)
2. Run:
   - `docker compose up -d --build`
3. Open:
   - API: http://localhost:3000/signals/latest
   - Dashboard: http://localhost:3001
   - AI health: http://localhost:8000/health
   - Backtest: http://localhost:3000/backtest?symbol=BTCUSDT&interval=15m&limit=800

## Notes
- This is signals-only (no trading).
- `synchronize: true` is enabled for development. For production, switch to migrations.
