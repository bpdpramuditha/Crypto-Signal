import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Signal } from './signals/signal.entity';
import { SignalsModule } from './signals/signals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Signal],
      synchronize: true, // dev only
    }),

    ScheduleModule.forRoot(),
    SignalsModule,
  ],
})
export class AppModule {}
