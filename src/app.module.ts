import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceController } from './binance/binance.controller';
import { BinanceService } from './binance/binance.service';
import { BinanceLocal } from './binance/binance.local';
import { PrismaService } from './prisma/prisma.service';
import { TasksCronService } from './tasks-cron/tasks-cron.service';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, BinanceController],
  providers: [
    PrismaService,
    AppService,
    BinanceService,
    BinanceLocal,
    TasksCronService
  ],
})
export class AppModule {}
