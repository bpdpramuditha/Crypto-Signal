import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private baseUrl = process.env.AI_URL || 'http://localhost:8000';

  async predictUpProbability(features: {
    ema50: number;
    ema200: number;
    rsi: number;
    volumeRatio: number;
  }): Promise<number | undefined> {
    try {
      const res = await axios.post(`${this.baseUrl}/predict`, features, {
        timeout: 8000,
      });
      const p = res.data?.up_probability;
      if (typeof p === 'number') return p;
      return undefined;
    } catch {
      return undefined;
    }
  }
}
