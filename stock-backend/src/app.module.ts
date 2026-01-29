import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { StocksModule } from "./stocks/stocks.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, ttl: 30 }), // cache 30s by default
    StocksModule,
  ],
})
export class AppModule {}
