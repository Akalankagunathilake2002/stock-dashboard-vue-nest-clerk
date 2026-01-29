import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StocksService {
  constructor(private config: ConfigService) {}

  async getQuote(symbol: string) {
    const base = this.config.get<string>("TWELVE_DATA_BASE_URL") || "https://api.twelvedata.com";
    const apiKey = this.config.get<string>("TWELVE_DATA_API_KEY");

    if (!apiKey) {
      throw new InternalServerErrorException("Missing TWELVE_DATA_API_KEY in backend .env");
    }

    const url = `${base}/quote?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new InternalServerErrorException(data?.message || "Twelve Data error");
    }

    return data;
  }
}
