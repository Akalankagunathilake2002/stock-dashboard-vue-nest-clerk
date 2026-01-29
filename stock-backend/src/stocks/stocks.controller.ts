import { Controller, Get, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { StocksService } from "./stocks.service";
import { ClerkAuthGuard } from "../auth/clerk-auth.guard";

@Controller("stocks")
@UseGuards(ClerkAuthGuard)
@UseInterceptors(CacheInterceptor)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get("quote")
  @CacheTTL(30) // cache this endpoint 30s
  getQuote(@Query("symbol") symbol: string) {
    return this.stocksService.getQuote(symbol || "AAPL");
  }
}
