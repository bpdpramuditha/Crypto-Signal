import { Controller, Get, Query } from '@nestjs/common';
import { BacktestService } from './backtest.service';

@Controller('backtest')
export class BacktestController {
  constructor(private readonly svc: BacktestService) {}

  @Get()
  run(
    @Query('symbol') symbol = 'BTCUSDT',
    @Query('interval') interval = '15m',
    @Query('limit') limit = '500',
    @Query('feeBps') feeBps = '10',
  ) {
    return this.svc.run(symbol, interval, Number(limit), Number(feeBps));
  }
}
