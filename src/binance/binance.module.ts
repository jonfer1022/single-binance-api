import { Module } from '@nestjs/common';
import { BinanceService } from "./binance.service";
import { BinanceController } from "./binance.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [BinanceController],
  providers: [BinanceService, PrismaService]
})
export class UsersModule {}
