import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BinanceService } from "./binance.service";

@Controller('binance')
export class BinanceController {

  constructor(private binanceService: BinanceService){};

  @Get("/pairs")
  async pairs(): Promise<Object> {
    return await this.binanceService.taskGetPairs();
  }

  @Post("/pairs")
  async postPairs(@Body() body:{ symbol: string }): Promise<Object> {
    return await this.binanceService.taskPutPairs(body.symbol);
  }

  @Get('/average')
  async getUser(@Query('symbol') symbol: string, @Query('lectures') lectures: string): Promise<Object> {
    return await this.binanceService.taskGetAverage(symbol, parseInt(lectures));
  }
}
