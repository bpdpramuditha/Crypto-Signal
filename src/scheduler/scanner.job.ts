@Cron('*/15 * * * *')
async scanMarket() {
  const candles = await this.binance.getCandles('BTCUSDT');
  const indicators = calculateIndicators(candles);
  const signal = generateSignal(indicators);
  await this.repo.save({ symbol: 'BTCUSDT', ...signal, indicators });
}