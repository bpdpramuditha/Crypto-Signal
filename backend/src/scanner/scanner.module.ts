import { Module } from '@nestjs/common';
import { ScannerService } from './scanner.service';
import { BinanceService } from '../binance/binance.service';
import { SignalsModule } from '../signals/signals.module';
import { AiModule } from '../ai/ai.module';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports: [SignalsModule, AiModule, RealtimeModule],
  providers: [ScannerService, BinanceService],
})
export class ScannerModule {}
