import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BinanceService } from '../binance/binance.service';
import { calculateIndicators } from '../indicators/indicator.service';
import { generateSignal } from './signal.logic';
import { SignalsService } from '../signals/signals.service';
import { AiService } from '../ai/ai.service';
import { SignalsGateway } from '../realtime/signals.gateway';

@Injectable()
export class ScannerService {
  constructor(
    private readonly binance: BinanceService,
    private readonly signals: SignalsService,
    private readonly ai: AiService,
    private readonly gateway: SignalsGateway,
  ) {}

  private get symbols(): string[] {
    const raw = process.env.SCAN_SYMBOLS || 'BTCUSDT,ETHUSDT';
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }

  private get interval(): string {
    return process.env.SCAN_INTERVAL || '15m';
  }

  @Cron(process.env.SCAN_CRON || '*/15 * * * *')
  async scanMarket() {
    for (const symbol of this.symbols) {
      try {
        const candles = await this.binance.getCandles(symbol, this.interval, 200);
        const ind = calculateIndicators(candles);
        const decision = generateSignal(ind);

        const aiProb = await this.ai.predictUpProbability({
          ema50: ind.ema50,
          ema200: ind.ema200,
          rsi: ind.rsi,
          volumeRatio: ind.volumeRatio,
        });

        if (typeof aiProb === 'number') {
          const aiBoost =
            decision.signal === 'BUY'
              ? Math.max(0, (aiProb - 0.5) * 40)
              : decision.signal === 'SELL'
              ? Math.max(0, (0.5 - aiProb) * 40)
              : 0;

          decision.confidence = Math.min(99, Math.round(decision.confidence + aiBoost));
          decision.reason.push(`AI up-probability: ${(aiProb * 100).toFixed(1)}%`);
        }

        const saved = await this.signals.saveSignal({
          symbol,
          timeframe: this.interval,
          indicators: ind,
          decision,
          aiUpProbability: aiProb,
        });

        this.gateway.broadcast(saved);

        console.log(`[SCAN] ${symbol} -> ${decision.signal} (${decision.confidence}%)`);
      } catch (e: any) {
        console.error(`[SCAN] ${symbol} failed:`, e?.message || e);
      }
    }
  }
}
