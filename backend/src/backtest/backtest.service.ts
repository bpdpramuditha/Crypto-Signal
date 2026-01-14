import { Injectable } from '@nestjs/common';
import { BinanceService } from '../binance/binance.service';
import { calculateIndicators } from '../indicators/indicator.service';
import { generateSignal } from '../scanner/signal.logic';

type Trade = { entry: number; exit: number; pnlPct: number };

@Injectable()
export class BacktestService {
  constructor(private readonly binance: BinanceService) {}

  async run(symbol: string, interval: string, limit: number, feeBps: number) {
    const candles = await this.binance.getCandles(symbol, interval, limit);
    const closes = candles.map((c) => Number(c[4]));

    let inPosition = false;
    let entry = 0;
    const trades: Trade[] = [];

    for (let i = 220; i < candles.length - 1; i++) {
      const slice = candles.slice(0, i + 1);
      const ind = calculateIndicators(slice);
      const decision = generateSignal(ind);

      const nextPrice = closes[i + 1];

      if (!inPosition && decision.signal === 'BUY') {
        inPosition = true;
        entry = nextPrice;
      }

      if (inPosition && decision.signal === 'SELL') {
        inPosition = false;
        const exit = nextPrice;

        const gross = (exit - entry) / entry;
        const fee = (feeBps / 10000) * 2;
        const net = gross - fee;

        trades.push({ entry, exit, pnlPct: net * 100 });
      }
    }

    const total = trades.reduce((s, t) => s + t.pnlPct, 0);
    const wins = trades.filter((t) => t.pnlPct > 0).length;
    const winRate = trades.length ? (wins / trades.length) * 100 : 0;
    const avg = trades.length ? total / trades.length : 0;
    const maxDrawdown = this.computeMaxDrawdown(trades);

    return {
      symbol,
      interval,
      trades: trades.length,
      winRate: Number(winRate.toFixed(2)),
      avgTradePct: Number(avg.toFixed(3)),
      totalReturnPct: Number(total.toFixed(3)),
      maxDrawdownPct: Number(maxDrawdown.toFixed(3)),
      sampleTrades: trades.slice(-10),
    };
  }

  private computeMaxDrawdown(trades: Trade[]) {
    let equity = 100;
    let peak = 100;
    let maxDd = 0;

    for (const t of trades) {
      equity *= 1 + t.pnlPct / 100;
      if (equity > peak) peak = equity;
      const dd = ((peak - equity) / peak) * 100;
      if (dd > maxDd) maxDd = dd;
    }
    return maxDd;
  }
}
