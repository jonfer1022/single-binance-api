import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BinanceLocal } from "./binance.local";

@Injectable()
export class BinanceService {

  constructor(
    private httpModule: HttpService,
    private binanceLocal: BinanceLocal
  ) {};

  async taskGetPairs(): Promise<Object> {
    return await this.binanceLocal.getAllSymbols();
  }

  async taskPutPairs(_symbol: string): Promise<Object> {
    let response: { data: [] } = await this.httpModule.get("https://api.binance.com/api/v1/ticker/24hr").toPromise();
    let msg = "Simbolo anteriormente creado...";
    for (let i = 0; i < response.data.length; i++) {
      let { symbol } = response.data[i];
      if( _symbol === symbol) {
        let result = await this.binanceLocal.getAllSymbols();
        let flag: boolean = false;
        if(!result.length){
          await this.binanceLocal.putSymbol(_symbol);
          msg = "Simbolo creado exitosamente...";
        } else {
          for (let z = 0; z < result.length; z++) {
            const element:any = result[z];
            if(element.symbol === _symbol) flag = true;
            if(!flag){
              if(z === result.length - 1) {
                await this.binanceLocal.putSymbol(_symbol);
                msg = "Simbolo creado exitosamente...";
              }
            }
          }
        }
      }
    }
    return { result: msg }
  }

  async taskGetAverage(symbol: string, lectures: number): Promise<Object> {
    let res:any = await this.binanceLocal.getSymbol(symbol);
    return await this.binanceLocal.getHistory(res[0].id, lectures);
  }

}
