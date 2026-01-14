import { Controller, Get, Query, Param } from '@nestjs/common';
import { SignalsService } from './signals.service';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signals: SignalsService) {}

  @Get('latest')
  latest(@Query('limit') limit?: string) {
    return this.signals.latest(limit ? Number(limit) : 50);
  }

  @Get('history/:symbol')
  history(@Param('symbol') symbol: string, @Query('limit') limit?: string) {
    return this.signals.bySymbol(symbol, limit ? Number(limit) : 200);
  }
}
