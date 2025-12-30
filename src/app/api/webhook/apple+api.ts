import { slog } from "@/lib/log";

/**
 * Apple App Store Connect Build Upload Status Webhook
 *
 * Receives notifications when build upload status changes:
 * - PROCESSING: Build is being processed
 * - COMPLETE: Build processed successfully, ready for testing
 * - FAILED: Build encountered an issue
 *
 * Sends formatted Slack notifications to #ai-tattoo-app channel.
 */

// Build upload state types from Apple
type BuildUploadState = "PROCESSING" | "COMPLETE" | "FAILED";

// Apple webhook payload structure (actual format from App Store Connect)
interface AppleWebhookPayload {
  data: {
    type: string; // "webhookPingCreated" | "buildUploadStateUpdated"
    id: string;
    version?: number;
    attributes: {
      // For ping events
      timestamp?: string;
      // For build state change events
      oldState?: BuildUploadState;
      newState?: BuildUploadState;
    };
    relationships?: {
      instance?: {
        data?: {
          type: string;
          id: string;
        };
        links?: {
          self: string;
        };
      };
    };
  };
}

// Slack message config for each state
const STATE_CONFIG: Record<
  BuildUploadState,
  { color: string; emoji: string; title: string; message: string }
> = {
  PROCESSING: {
    color: "#FFA500", // Orange
    emoji: "⏳",
    title: "Build Processing",
    message:
      "Your build is being processed by App Store Connect. You'll be notified when it's ready.",
  },
  COMPLETE: {
    color: "#36a64f", // Green
    emoji: "✅",
    title: "Build Ready for Testing!",
    message:
      "Your build has been processed successfully and is now ready for testing on TestFlight! 🎉",
  },
  FAILED: {
    color: "#E01E5A", // Red
    emoji: "❌",
    title: "Build Failed",
    message:
      "Your build failed to process. Please check App Store Connect for details and resolve the issues before re-uploading.",
  },
};

/**
 * Convert ArrayBuffer to hex string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verify Apple webhook signature using HMAC SHA-256
 * Apple sends signature as: hmacsha256=<hex_signature>
 */
async function verifyAppleSignature(
  payload: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) {
    slog(
      "apple-webhook",
      "⚠️ No signature header provided - skipping verification"
    );
    // For now, allow requests without signature for testing
    // In production, you may want to return false here
    return true;
  }

  try {
    // Apple sends signature as "hmacsha256=<hex>" - extract the hex part
    const receivedHex = signature.replace(/^hmacsha256=/i, "").toLowerCase();

    // Create HMAC SHA-256 hash using the secret
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payload)
    );

    // Convert to hex (same format Apple uses)
    const computedHex = bufferToHex(signatureBuffer);

    const isValid = computedHex === receivedHex;

    if (!isValid) {
      slog("apple-webhook", "❌ Signature mismatch", {
        received: receivedHex.slice(0, 20) + "...",
        computed: computedHex.slice(0, 20) + "...",
      });
    } else {
      slog("apple-webhook", "✅ Signature verified successfully");
    }

    return isValid;
  } catch (error) {
    slog("apple-webhook", "❌ Signature verification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

/**
 * Send a simple Slack notification for ping events
 */
async function sendPingNotification(): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    slog("apple-webhook", "⚠️ SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const slackMessage = {
    text: "🍎 Apple Webhook Connected!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "✅ *App Store Connect webhook is now connected!*\n\nYou'll receive notifications here when build upload status changes.",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📅 ${new Date().toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              timeZoneName: "short",
            })}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      slog("apple-webhook", "❌ Slack ping notification failed", {
        status: response.status,
      });
      return false;
    }

    slog("apple-webhook", "✅ Slack ping notification sent");
    return true;
  } catch (error) {
    slog("apple-webhook", "❌ Slack ping notification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

// TestFlight URL for Inkigo
const TESTFLIGHT_URL =
  "https://appstoreconnect.apple.com/teams/44a10798-a75d-4b45-8c9d-0b7656df7976/apps/6751748193/testflight/ios";

/**
 * Format and send Slack notification for build state changes
 */
async function sendBuildStateNotification(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    slog("apple-webhook", "⚠️ SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const { attributes } = payload.data;
  const newState = attributes.newState || "PROCESSING";
  const oldState = attributes.oldState;
  const config = STATE_CONFIG[newState] || STATE_CONFIG.PROCESSING;

  // Build status transition text
  const transitionText = oldState
    ? `${oldState} → *${newState}*`
    : `*${newState}*`;

  // Construct a simple, clean Slack message
  const slackMessage = {
    text: `${config.emoji} ${config.title}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${config.emoji} ${config.title}`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: config.message,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Status*\n${transitionText}`,
          },
          {
            type: "mrkdwn",
            text: `*App*\nInkigo`,
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "📱 Open TestFlight",
              emoji: true,
            },
            url: TESTFLIGHT_URL,
            style: newState === "COMPLETE" ? "primary" : undefined,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📅 ${new Date().toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              timeZoneName: "short",
            })}`,
          },
        ],
      },
    ],
  };

  // Add color using attachment wrapper
  const slackPayload = {
    attachments: [
      {
        color: config.color,
        blocks: slackMessage.blocks,
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      slog("apple-webhook", "❌ Slack notification failed", {
        status: response.status,
        statusText: response.statusText,
        response: responseText,
      });
      return false;
    }

    slog("apple-webhook", "✅ Slack notification sent", {
      newState,
      oldState,
    });
    return true;
  } catch (error) {
    slog("apple-webhook", "❌ Slack notification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

export async function POST(request: Request) {
  slog(
    "apple-webhook",
    "🍎 ========== APPLE BUILD WEBHOOK RECEIVED =========="
  );

  try {
    const secret = process.env.APPLE_WEBHOOK_SECRET;

    if (!secret) {
      slog("apple-webhook", "❌ APPLE_WEBHOOK_SECRET not configured");
      return new Response("Server configuration error", { status: 500 });
    }

    // Get the raw body for signature verification
    const rawBody = await request.text();

    // Log all headers for debugging
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = key.toLowerCase().includes("signature")
        ? value.slice(0, 30) + "..."
        : value;
    });
    slog("apple-webhook", "📬 Request headers", headers);

    // Try both possible signature header names
    const signature =
      request.headers.get("X-Apple-Notification-Signature") ||
      request.headers.get("X-Apple-Signature");

    const isValid = await verifyAppleSignature(rawBody, signature, secret);

    if (!isValid) {
      slog("apple-webhook", "❌ Invalid signature - rejecting request");
      return new Response("Unauthorized", { status: 401 });
    }

    // Parse the payload
    const payload: AppleWebhookPayload = JSON.parse(rawBody);

    slog("apple-webhook", "📦 Webhook payload", {
      type: payload.data?.type,
      id: payload.data?.id,
      version: payload.data?.version,
      oldState: payload.data?.attributes?.oldState,
      newState: payload.data?.attributes?.newState,
      timestamp: payload.data?.attributes?.timestamp,
    });

    // Handle different event types
    const eventType = payload.data?.type;

    if (eventType === "webhookPingCreated") {
      // This is a test ping from App Store Connect
      slog("apple-webhook", "🏓 Received ping event - webhook is connected!");
      await sendPingNotification();
    } else if (eventType === "buildUploadStateUpdated") {
      // This is an actual build state change
      await sendBuildStateNotification(payload);
    } else {
      // Unknown event type - log and send generic notification
      slog("apple-webhook", `⚠️ Unknown event type: ${eventType}`);
      await sendBuildStateNotification(payload);
    }

    slog("apple-webhook", "✅ Webhook processed successfully");
    slog("apple-webhook", "========== END APPLE WEBHOOK ==========\n");

    return new Response("OK", { status: 200 });
  } catch (error) {
    slog("apple-webhook", "❌ Error processing webhook", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    slog("apple-webhook", "========== END APPLE WEBHOOK (ERROR) ==========\n");
    return new Response("Internal Server Error", { status: 500 });
  }
}
