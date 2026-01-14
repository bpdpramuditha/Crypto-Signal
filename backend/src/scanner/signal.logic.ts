export type Decision = {
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number; // 0..100
  reason: string[];
};

export function generateSignal(ind: any): Decision {
  const reason: string[] = [];
  let confidence = 0;

  const uptrend = ind.ema50 > ind.ema200;
  const downtrend = ind.ema50 < ind.ema200;

  if (uptrend) {
    confidence += 30;
    reason.push('Trend: EMA50 > EMA200 (uptrend)');
  }
  if (downtrend) {
    confidence += 30;
    reason.push('Trend: EMA50 < EMA200 (downtrend)');
  }

  if (ind.rsi < 40) {
    confidence += 25;
    reason.push(`RSI ${ind.rsi.toFixed(1)} suggests oversold/weakness`);
  } else if (ind.rsi > 65) {
    confidence += 25;
    reason.push(`RSI ${ind.rsi.toFixed(1)} suggests overbought/strength`);
  } else {
    confidence += 10;
    reason.push(`RSI ${ind.rsi.toFixed(1)} neutral`);
  }

  if (ind.volumeRatio >= 1.2) {
    confidence += 20;
    reason.push(`Volume spike: ${ind.volumeRatio.toFixed(2)}x avg`);
  } else {
    confidence += 5;
    reason.push(`Volume normal: ${ind.volumeRatio.toFixed(2)}x avg`);
  }

  if (uptrend && ind.rsi < 55) {
    return { signal: 'BUY', confidence: Math.min(confidence, 95), reason };
  }
  if (downtrend && ind.rsi > 45) {
    return { signal: 'SELL', confidence: Math.min(confidence, 95), reason };
  }
  return { signal: 'HOLD', confidence: Math.min(confidence, 80), reason };
}
