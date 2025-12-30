import { slog } from "@/lib/log";

/**
 * Apple App Store Connect Build Upload Status Webhook
 *
 * Receives notifications when build upload status changes:
 * - Processing: Build is being processed
 * - Complete: Build processed successfully, ready for testing
 * - Failed: Build encountered an issue
 *
 * Sends formatted Slack notifications to #ai-tattoo-app channel.
 */

// Build upload status types from Apple
type BuildUploadStatus = "PROCESSING" | "COMPLETE" | "FAILED";

// Apple webhook event types
type AppleWebhookEventType =
  | "webhookPingCreated" // Test ping from App Store Connect
  | "buildUploadStatusChanged"; // Actual build status change

// Apple webhook payload structure (based on App Store Connect webhooks)
interface AppleWebhookPayload {
  data: {
    type: AppleWebhookEventType;
    id: string;
    version?: number;
    attributes: {
      // For ping events
      timestamp?: string;
      // For build events
      appId?: string;
      appName?: string;
      bundleId?: string;
      version?: string;
      buildNumber?: string;
      status?: BuildUploadStatus;
      platform?: string;
      processingState?: string;
      uploadedDate?: string;
      expirationDate?: string;
      minOsVersion?: string;
      iconAssetToken?: string;
      // Error details for failed builds
      errors?: {
        code: string;
        detail: string;
      }[];
      warnings?: {
        code: string;
        detail: string;
      }[];
    };
  };
  meta?: {
    webhook?: {
      eventTimestamp?: string;
    };
  };
}

// Slack message attachment colors
const STATUS_CONFIG: Record<
  BuildUploadStatus,
  { color: string; emoji: string; title: string }
> = {
  PROCESSING: {
    color: "#FFA500", // Orange
    emoji: "⏳",
    title: "Build Processing",
  },
  COMPLETE: {
    color: "#36a64f", // Green
    emoji: "✅",
    title: "Build Ready for Testing!",
  },
  FAILED: {
    color: "#E01E5A", // Red
    emoji: "❌",
    title: "Build Failed",
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

/**
 * Format and send Slack notification for build status changes
 */
async function sendBuildStatusNotification(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    slog("apple-webhook", "⚠️ SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const { attributes } = payload.data;
  const status = attributes.status || "PROCESSING";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PROCESSING;

  // Build the fields array
  const fields: { title: string; value: string; short: boolean }[] = [];

  if (attributes.appName) {
    fields.push({ title: "App", value: attributes.appName, short: true });
  }

  if (attributes.version) {
    fields.push({ title: "Version", value: attributes.version, short: true });
  }

  if (attributes.buildNumber) {
    fields.push({
      title: "Build",
      value: attributes.buildNumber,
      short: true,
    });
  }

  if (attributes.platform) {
    fields.push({
      title: "Platform",
      value: attributes.platform,
      short: true,
    });
  }

  if (attributes.bundleId) {
    fields.push({
      title: "Bundle ID",
      value: attributes.bundleId,
      short: false,
    });
  }

  // Add error details for failed builds
  if (status === "FAILED" && attributes.errors?.length) {
    const errorText = attributes.errors
      .map((e) => `• ${e.code}: ${e.detail}`)
      .join("\n");
    fields.push({ title: "Errors", value: errorText, short: false });
  }

  // Add warnings if present
  if (attributes.warnings?.length) {
    const warningText = attributes.warnings
      .map((w) => `• ${w.code}: ${w.detail}`)
      .join("\n");
    fields.push({ title: "Warnings", value: warningText, short: false });
  }

  // Construct Slack message with attachments for rich formatting
  const slackMessage = {
    text: `${config.emoji} ${config.title}`,
    attachments: [
      {
        color: config.color,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: getStatusMessage(status, attributes),
            },
          },
          {
            type: "section",
            fields: fields.slice(0, 4).map((f) => ({
              type: "mrkdwn",
              text: `*${f.title}*\n${f.value}`,
            })),
          },
          // Add remaining fields if any
          ...(fields.length > 4
            ? [
                {
                  type: "section",
                  fields: fields.slice(4).map((f) => ({
                    type: "mrkdwn",
                    text: `*${f.title}*\n${f.value}`,
                  })),
                },
              ]
            : []),
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
      slog("apple-webhook", "❌ Slack notification failed", {
        status: response.status,
        statusText: response.statusText,
      });
      return false;
    }

    slog("apple-webhook", "✅ Slack notification sent", { status });
    return true;
  } catch (error) {
    slog("apple-webhook", "❌ Slack notification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

/**
 * Get human-readable status message
 */
function getStatusMessage(
  status: BuildUploadStatus,
  attributes: AppleWebhookPayload["data"]["attributes"]
): string {
  const appName = attributes.appName || "Your app";
  const version = attributes.version || "";
  const build = attributes.buildNumber || "";
  const versionInfo = version && build ? ` (${version} build ${build})` : "";

  switch (status) {
    case "PROCESSING":
      return `🔄 *${appName}*${versionInfo} is being processed by App Store Connect. You'll be notified when it's ready.`;
    case "COMPLETE":
      return `🎉 *${appName}*${versionInfo} has been processed successfully and is now ready for testing on TestFlight!`;
    case "FAILED":
      return `⚠️ *${appName}*${versionInfo} failed to process. Please check App Store Connect for details and resolve the issues before re-uploading.`;
    default:
      return `Build status update for *${appName}*${versionInfo}: ${status}`;
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
      status: payload.data?.attributes?.status,
      appName: payload.data?.attributes?.appName,
      buildVersion: payload.data?.attributes?.version,
      buildNumber: payload.data?.attributes?.buildNumber,
      platform: payload.data?.attributes?.platform,
      timestamp: payload.data?.attributes?.timestamp,
    });

    // Handle different event types
    const eventType = payload.data?.type;

    if (eventType === "webhookPingCreated") {
      // This is a test ping from App Store Connect
      slog("apple-webhook", "🏓 Received ping event - webhook is connected!");
      await sendPingNotification();
    } else {
      // This is an actual build status change
      await sendBuildStatusNotification(payload);
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
