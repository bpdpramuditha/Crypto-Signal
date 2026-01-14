import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BinanceService {
  async getCandles(symbol: string, interval = '15m', limit = 200) {
    const res = await axios.get('https://api.binance.com/api/v3/klines', {
      params: { symbol, interval, limit },
      timeout: 15000,
    });
    return res.data as any[];
  }
}
