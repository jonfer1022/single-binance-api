import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BinanceLocal {

  constructor(private prisma: PrismaService) {}

  async getAllSymbols(): Promise<Array<Object>> {
    return await this.prisma.symbols.findMany();
  }

  async putSymbol(symbol: string): Promise<any> {
    return await this.prisma.symbols.create({
      data: { 
        symbol,
        created_at: new Date() 
      }
    });
  }

  async createHistoryPriceSymbol(symbol_id: number, average: number): Promise<any> {
    return await this.prisma.history.create({
      data: { 
        symbol_id,
        average,
        created_at: new Date() 
      }
    });
  }

  async getSymbol(symbol: string): Promise<Array<Object>> {
    return await this.prisma.symbols.findMany({
      where: { symbol }
    });
  }

  async getHistory(symbol_id: number, lectures: number): Promise<Array<Object>> {
    return await this.prisma.history.findMany({
      take: lectures,
      where: { symbol_id }
    });
  }

}