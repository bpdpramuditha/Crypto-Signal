import axios from 'axios';

export class BinanceService {
  async getCandles(symbol: string, interval = '15m') {
    const res = await axios.get('https://api.binance.com/api/v3/klines', {
      params: { symbol, interval, limit: 200 },
    });
    return res.data;
  }
}
