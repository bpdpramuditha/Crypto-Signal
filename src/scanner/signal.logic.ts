export function generateSignal(ind) {
  if (ind.ema50 > ind.ema200 && ind.rsi < 70)
    return { signal: 'BUY', confidence: 70, reason: ['EMA crossover'] };

  if (ind.ema50 < ind.ema200 && ind.rsi > 30)
    return { signal: 'SELL', confidence: 70, reason: ['Bearish trend'] };

  return { signal: 'HOLD', confidence: 40, reason: ['No confirmation'] };
}
