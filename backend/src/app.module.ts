import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Signal } from './signals/signal.entity';
import { SignalsModule } from './signals/signals.module';
import { ScannerModule } from './scanner/scanner.module';
import { AiModule } from './ai/ai.module';
import { BacktestModule } from './backtest/backtest.module';
import { RealtimeModule } from './realtime/realtime.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Signal],
      synchronize: true // dev only. For prod -> migrations.
    }),

    ScheduleModule.forRoot(),

    AiModule,
    SignalsModule,
    ScannerModule,
    BacktestModule,
    RealtimeModule
  ],
})
export class AppModule {}
