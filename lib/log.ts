/**
 * Logging utilities for the AI Tattoo app.
 *
 * Use `slog` for server-side code (+api.ts files, server-utils, etc.)
 * Use `clog` for client-side code (components, hooks, screens, etc.)
 *
 * @example
 * // Server-side (in src/app/api/user/usage+api.ts)
 * import { slog } from "@/lib/log";
 * slog("usage+api", "fetched usage", { count: 5, limit: 100 });
 * // Output: 🖥️ [usage+api] fetched usage
 * // {
 * //   "count": 5,
 * //   "limit": 100
 * // }
 *
 * @example
 * // Client-side (in src/components/Paywall.tsx)
 * import { clog } from "@/lib/log";
 * clog("Paywall", "user opened paywall");
 * // Output: 📱 [Paywall] user opened paywall
 */

type LogData =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | null
  | undefined;

function formatLog(
  env: "🖥️" | "📱",
  tag: string,
  message: string,
  data?: LogData
): void {
  const prefix = `${env} [${tag}]`;

  if (data !== undefined && data !== null) {
    if (typeof data === "object") {
      console.log(`${prefix} ${message}\n${JSON.stringify(data, null, 2)}`);
    } else {
      console.log(`${prefix} ${message}`, data);
    }
  } else {
    console.log(`${prefix} ${message}`);
  }
}

/**
 * Server-side logger. Use in API routes (+api.ts files) and server utilities.
 *
 * @param tag - Short identifier for the file/function (e.g., "usage+api", "auth-middleware")
 * @param message - Brief description of what's happening
 * @param data - Optional data to log (objects will be pretty-printed with JSON.stringify)
 *
 * @example
 * slog("text-to-image", "generation started", { userId: "abc123", prompt: "dragon" });
 * // 🖥️ [text-to-image] generation started
 * // {
 * //   "userId": "abc123",
 * //   "prompt": "dragon"
 * // }
 *
 * @example
 * slog("auth-middleware", `authenticated user ${userId.slice(0, 8)}…`);
 * // 🖥️ [auth-middleware] authenticated user nPJkSvUW…
 */
export const slog = (tag: string, message: string, data?: LogData) =>
  formatLog("🖥️", tag, message, data);

/**
 * Client-side logger. Use in components, hooks, screens, and other client code.
 *
 * @param tag - Short identifier for the component/hook (e.g., "Paywall", "useAuth")
 * @param message - Brief description of what's happening
 * @param data - Optional data to log (objects will be pretty-printed with JSON.stringify)
 *
 * @example
 * clog("TattooHistory", "loaded tattoos", { count: 12 });
 * // 📱 [TattooHistory] loaded tattoos
 * // {
 * //   "count": 12
 * // }
 *
 * @example
 * clog("CameraView", "photo captured");
 * // 📱 [CameraView] photo captured
 */
export const clog = (tag: string, message: string, data?: LogData) =>
  formatLog("📱", tag, message, data);
