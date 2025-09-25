import { auth } from "../lib/auth";

/**
 * Middleware to authenticate API requests using better-auth sessions
 * Compatible with Cloudflare Workers
 */
export async function authenticateRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log("🔐 auth middleware: Session found:", session?.session);

  if (!session) {
    console.log("🔐 auth middleware: No session found, returning 401");
    return {
      error: new Response(
        JSON.stringify({ error: "Unauthorized - Please sign in" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
      session: null,
    };
  }

  return {
    error: null,
    session,
  };
}

/**
 * Higher-order function to protect API routes with authentication
 * Usage: export const POST = withAuth(async (request, session) => { ... });
 */
export function withAuth<T extends any[]>(
  handler: (request: Request, session: any, ...args: T) => Promise<Response>
) {
  return async (request: Request, ...args: T): Promise<Response> => {
    const { error, session } = await authenticateRequest(request);

    if (error) {
      return error;
    }

    return handler(request, session, ...args);
  };
}
