import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal } from './signal.entity';
import type { Decision } from '../scanner/signal.logic';

@Injectable()
export class SignalsService {
  constructor(
    @InjectRepository(Signal) private readonly repo: Repository<Signal>,
  ) {}

  async saveSignal(args: {
    symbol: string;
    timeframe: string;
    indicators: any;
    decision: Decision;
    aiUpProbability?: number;
  }) {
    const { symbol, timeframe, indicators, decision, aiUpProbability } = args;
    return this.repo.save({
      symbol,
      timeframe,
      signal: decision.signal,
      confidence: decision.confidence,
      indicators,
      reasons: decision.reason,
      aiUpProbability,
    });
  }

  latest(limit = 50) {
    return this.repo.find({ take: limit, order: { createdAt: 'DESC' } });
  }

  bySymbol(symbol: string, limit = 200) {
    return this.repo.find({
      where: { symbol },
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }
}
