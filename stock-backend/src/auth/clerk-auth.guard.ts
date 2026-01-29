import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClerkClient } from "@clerk/backend";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private clerk;

  constructor(private config: ConfigService) {
    this.clerk = createClerkClient({
      secretKey: this.config.get<string>("CLERK_SECRET_KEY")!,
      publishableKey: this.config.get<string>("CLERK_PUBLISHABLE_KEY")!,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing Bearer token");
    }

    // Build a Web Fetch Request from Express request
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (typeof v === "string") headers.set(k, v);
      else if (Array.isArray(v)) headers.set(k, v.join(","));
    }

    const webRequest = new Request(fullUrl, {
      method: req.method,
      headers,
    });

    try {
      const result = await this.clerk.authenticateRequest(webRequest, {
        // allow your frontend origin
        authorizedParties: [this.config.get("FRONTEND_ORIGIN") || "http://localhost:5173"],
      });

      if (!result.isAuthenticated) {
        throw new UnauthorizedException("User not authenticated");
      }

      // Optional: attach auth info
      req.auth = result.toAuth();

      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
