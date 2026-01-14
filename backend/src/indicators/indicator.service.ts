import { EMA, RSI } from 'technicalindicators';

export function calculateIndicators(candles: any[]) {
  const closes = candles.map((c) => Number(c[4]));
  const volumes = candles.map((c) => Number(c[5]));

  const ema50 = EMA.calculate({ period: 50, values: closes }).slice(-1)[0];
  const ema200 = EMA.calculate({ period: 200, values: closes }).slice(-1)[0];
  const rsi = RSI.calculate({ period: 14, values: closes }).slice(-1)[0];

  const avgVolume =
    volumes.reduce((sum, v) => sum + v, 0) / Math.max(volumes.length, 1);
  const latestVolume = volumes[volumes.length - 1] ?? 0;

  const volumeRatio = avgVolume > 0 ? latestVolume / avgVolume : 1;

  return { ema50, ema200, rsi, avgVolume, latestVolume, volumeRatio };
}
