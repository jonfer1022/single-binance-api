import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { BinanceLocal } from "../binance/binance.local";

@Injectable()
export class TasksCronService {
  constructor(
    private httpModule: HttpService,
    private binanceLocal: BinanceLocal
  ) {};

  @Cron('0 0 * * * *')
  async cronEveryHour() {
    let allSymbols = await this.binanceLocal.getAllSymbols();
    allSymbols.forEach( async (item:any) => {
      let current: { data: any } = await this.httpModule.get(`https://api.binance.com/api/v3/avgPrice?symbol=${item.symbol}`).toPromise();
      await this.binanceLocal.createHistoryPriceSymbol(item.id, parseFloat(current.data.price))
    });
    console.log("¡cron executed!");
  }
}
