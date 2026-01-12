import { EMA, RSI } from 'technicalindicators';

export function calculateIndicators(candles) {
  const closes = candles.map((c) => +c[4]);
  return {
    ema50: EMA.calculate({ period: 50, values: closes }).at(-1),
    ema200: EMA.calculate({ period: 200, values: closes }).at(-1),
    rsi: RSI.calculate({ period: 14, values: closes }).at(-1),
  };
}
