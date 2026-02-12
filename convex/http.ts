import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Register BetterAuth routes (handles /api/auth/*)
authComponent.registerRoutes(http, createAuth);

// RevenueCat webhook
http.route({
  path: "/webhook/rc",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      // Verify authorization header
      const authHeader = request.headers.get("authorization");
      const secret = process.env.BETTER_AUTH_SECRET;

      if (secret && authHeader) {
        const token = authHeader.replace("Bearer ", "");
        if (token !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }
      } else if (secret) {
        return new Response("Unauthorized", { status: 401 });
      }

      const body = await request.json();
      const event = body?.event;

      if (!event || !event.type || !event.id) {
        return new Response("Invalid payload", { status: 400 });
      }

      await ctx.runMutation(internal.webhooks.processRevenueCatEvent, {
        eventType: event.type,
        eventId: event.id,
        appUserId: event.app_user_id,
        originalAppUserId: event.original_app_user_id,
        entitlementIds: event.entitlement_ids,
        productId: event.product_id,
        newProductId: event.new_product_id,
        purchasedAtMs: event.purchased_at_ms,
        expirationAtMs: event.expiration_at_ms,
        gracePeriodExpirationAtMs: event.grace_period_expiration_at_ms,
        autoResumeAtMs: event.auto_resume_at_ms,
        transferredFrom: event.transferred_from,
        transferredTo: event.transferred_to,
      });

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("[RC WEBHOOK] Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }),
});

// Apple App Store Connect webhook
http.route({
  path: "/webhook/apple",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const rawBody = await request.text();
      const signature =
        request.headers.get("X-Apple-Notification-Signature") ||
        request.headers.get("X-Apple-Signature") ||
        undefined;

      await ctx.runAction(internal.appleWebhook.processAppleWebhook, {
        rawBody,
        signature,
      });

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("[APPLE WEBHOOK] Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }),
});

// Feature request
http.route({
  path: "/feature-request",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { message, userId, userEmail } = body;

      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return new Response("Message is required", { status: 400 });
      }

      await ctx.runAction(internal.featureRequest.submitFeatureRequest, {
        message: message.trim(),
        userId,
        userEmail,
      });

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("[FEATURE REQUEST] Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }),
});

export default http;
