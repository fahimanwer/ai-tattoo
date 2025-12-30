import { slog } from "@/lib/log";

/**
 * Apple App Store Connect Webhook Handler
 *
 * Receives notifications for various App Store Connect events:
 * - Build upload state changes
 * - Build bundle processing state changes
 * - App store version state changes
 * - Beta app review submission state changes
 *
 * Sends formatted Slack notifications to the configured channel.
 */

// Event types from App Store Connect
type WebhookEventType =
  | "webhookPingCreated"
  | "buildUploadStateUpdated"
  | "buildBundleProcessingStateUpdated"
  | "appStoreVersionStateUpdated"
  | "appStoreVersionAppVersionStateUpdated"
  | "betaAppReviewSubmissionStateUpdated";

// Build upload states
type BuildUploadState = "PROCESSING" | "COMPLETE" | "FAILED";

// Build bundle processing states
type BuildBundleProcessingState = "PROCESSING" | "VALID" | "INVALID" | "FAILED";

// App store version states
type AppStoreVersionState =
  | "ACCEPTED"
  | "DEVELOPER_REJECTED"
  | "DEVELOPER_REMOVED_FROM_SALE"
  | "IN_REVIEW"
  | "INVALID_BINARY"
  | "METADATA_REJECTED"
  | "PENDING_APPLE_RELEASE"
  | "PENDING_CONTRACT"
  | "PENDING_DEVELOPER_RELEASE"
  | "PREPARE_FOR_SUBMISSION"
  | "PREORDER_READY_FOR_SALE"
  | "PROCESSING_FOR_APP_STORE"
  | "READY_FOR_REVIEW"
  | "READY_FOR_SALE"
  | "REJECTED"
  | "REMOVED_FROM_SALE"
  | "REPLACED_WITH_NEW_VERSION"
  | "WAITING_FOR_EXPORT_COMPLIANCE"
  | "WAITING_FOR_REVIEW";

// Beta app review submission states
type BetaAppReviewSubmissionState =
  | "WAITING_FOR_REVIEW"
  | "IN_REVIEW"
  | "REJECTED"
  | "APPROVED";

// Apple webhook payload structure
interface AppleWebhookPayload {
  data: {
    type: WebhookEventType;
    id: string;
    version?: number;
    attributes: {
      // For ping events
      timestamp?: string;
      // For state change events (legacy format)
      oldState?: string;
      newState?: string;
      // For state change events (new format)
      oldValue?: string;
      newValue?: string;
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
      app?: {
        data?: {
          type: string;
          id: string;
        };
      };
      build?: {
        data?: {
          type: string;
          id: string;
        };
      };
    };
  };
}

// Message configuration
interface MessageConfig {
  color: string;
  emoji: string;
  title: string;
  message: string;
}

// Build upload state config
const BUILD_UPLOAD_STATE_CONFIG: Record<BuildUploadState, MessageConfig> = {
  PROCESSING: {
    color: "#FFA500",
    emoji: "⏳",
    title: "Build Uploading",
    message: "Uploading your build to App Store Connect...",
  },
  COMPLETE: {
    color: "#36a64f",
    emoji: "✅",
    title: "Build Uploaded",
    message: "Build uploaded successfully!",
  },
  FAILED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Upload Failed",
    message: "Build upload failed. Check Xcode for details.",
  },
};

// Build bundle processing state config
const BUILD_BUNDLE_STATE_CONFIG: Record<
  BuildBundleProcessingState,
  MessageConfig
> = {
  PROCESSING: {
    color: "#FFA500",
    emoji: "⏳",
    title: "Processing Build",
    message: "Processing your build...",
  },
  VALID: {
    color: "#36a64f",
    emoji: "✅",
    title: "Build Ready",
    message: "Build processed and ready for TestFlight!",
  },
  INVALID: {
    color: "#E01E5A",
    emoji: "⚠️",
    title: "Invalid Build",
    message: "Build is invalid. Check App Store Connect for details.",
  },
  FAILED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Processing Failed",
    message: "Build processing failed. Check App Store Connect for details.",
  },
};

// App store version state config
const APP_VERSION_STATE_CONFIG: Record<AppStoreVersionState, MessageConfig> = {
  ACCEPTED: {
    color: "#36a64f",
    emoji: "✅",
    title: "Accepted",
    message: "App version accepted!",
  },
  DEVELOPER_REJECTED: {
    color: "#FFA500",
    emoji: "🔙",
    title: "Developer Rejected",
    message: "You rejected this version from review.",
  },
  DEVELOPER_REMOVED_FROM_SALE: {
    color: "#808080",
    emoji: "🚫",
    title: "Removed from Sale",
    message: "You removed this version from sale.",
  },
  IN_REVIEW: {
    color: "#007AFF",
    emoji: "👀",
    title: "In Review",
    message: "Apple is reviewing your app. Usually 24-48 hours.",
  },
  INVALID_BINARY: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Invalid Binary",
    message: "Binary is invalid. Upload a new build.",
  },
  METADATA_REJECTED: {
    color: "#E01E5A",
    emoji: "📝",
    title: "Metadata Rejected",
    message: "App metadata was rejected. Check App Store Connect.",
  },
  PENDING_APPLE_RELEASE: {
    color: "#36a64f",
    emoji: "🍎",
    title: "Pending Apple Release",
    message: "Approved! Waiting for Apple to release.",
  },
  PENDING_CONTRACT: {
    color: "#FFA500",
    emoji: "📄",
    title: "Pending Contract",
    message: "Waiting for contract agreement.",
  },
  PENDING_DEVELOPER_RELEASE: {
    color: "#36a64f",
    emoji: "🚀",
    title: "Ready to Release",
    message: "Approved! Release whenever you're ready.",
  },
  PREPARE_FOR_SUBMISSION: {
    color: "#808080",
    emoji: "📋",
    title: "Preparing",
    message: "Preparing for submission.",
  },
  PREORDER_READY_FOR_SALE: {
    color: "#36a64f",
    emoji: "🛒",
    title: "Pre-order Ready",
    message: "Pre-order is ready for sale!",
  },
  PROCESSING_FOR_APP_STORE: {
    color: "#FFA500",
    emoji: "⏳",
    title: "Processing",
    message: "Processing for App Store...",
  },
  READY_FOR_REVIEW: {
    color: "#007AFF",
    emoji: "📤",
    title: "Ready for Review",
    message: "Ready to submit for review.",
  },
  READY_FOR_SALE: {
    color: "#36a64f",
    emoji: "🎉",
    title: "Live!",
    message: "Your app is now live on the App Store!",
  },
  REJECTED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Rejected",
    message: "App was rejected. Check App Store Connect.",
  },
  REMOVED_FROM_SALE: {
    color: "#808080",
    emoji: "🚫",
    title: "Removed from Sale",
    message: "Version removed from sale.",
  },
  REPLACED_WITH_NEW_VERSION: {
    color: "#808080",
    emoji: "🔄",
    title: "Version Replaced",
    message: "Replaced with a newer version.",
  },
  WAITING_FOR_EXPORT_COMPLIANCE: {
    color: "#FFA500",
    emoji: "📋",
    title: "Export Compliance",
    message: "Complete export compliance info.",
  },
  WAITING_FOR_REVIEW: {
    color: "#007AFF",
    emoji: "⏳",
    title: "In Queue",
    message: "Submitted! In the review queue. Usually 24-48 hours.",
  },
};

// Beta review submission state config
const BETA_REVIEW_STATE_CONFIG: Record<
  BetaAppReviewSubmissionState,
  MessageConfig
> = {
  WAITING_FOR_REVIEW: {
    color: "#007AFF",
    emoji: "⏳",
    title: "TestFlight Pending",
    message: "Waiting for TestFlight review.",
  },
  IN_REVIEW: {
    color: "#007AFF",
    emoji: "👀",
    title: "TestFlight In Review",
    message: "TestFlight build is being reviewed.",
  },
  REJECTED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "TestFlight Rejected",
    message: "TestFlight build rejected. Check App Store Connect.",
  },
  APPROVED: {
    color: "#36a64f",
    emoji: "✅",
    title: "TestFlight Approved",
    message: "Build approved for external testing!",
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
    return true;
  }

  try {
    const receivedHex = signature.replace(/^hmacsha256=/i, "").toLowerCase();

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
 * Format timestamp for Slack
 */
function formatTimestamp(): string {
  return new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Send Slack notification
 */
async function sendSlackNotification(
  config: MessageConfig,
  oldState?: string,
  newState?: string
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    slog("apple-webhook", "⚠️ SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const transitionText =
    oldState && newState ? `${oldState} → ${newState}` : newState || "";

  const blocks: any[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${config.emoji} *${config.title}*\n${config.message}`,
      },
    },
  ];

  // Add context with transition and timestamp
  const contextParts = [];
  if (transitionText) {
    contextParts.push(transitionText);
  }
  contextParts.push(formatTimestamp());

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: contextParts.join(" • "),
      },
    ],
  });

  const slackPayload = {
    attachments: [
      {
        color: config.color,
        blocks,
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
        response: responseText,
      });
      return false;
    }

    slog("apple-webhook", "✅ Slack notification sent");
    return true;
  } catch (error) {
    slog("apple-webhook", "❌ Slack notification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

/**
 * Handle ping event
 */
async function handlePingEvent(): Promise<boolean> {
  return sendSlackNotification({
    color: "#36a64f",
    emoji: "🍎",
    title: "Webhook Connected",
    message:
      "App Store Connect webhook connected. You'll get build and app status alerts here.",
  });
}

/**
 * Get old and new state from payload attributes (supports both formats)
 */
function getStateTransition(
  attributes: AppleWebhookPayload["data"]["attributes"]
) {
  return {
    oldState: attributes.oldState || attributes.oldValue,
    newState: attributes.newState || attributes.newValue,
  };
}

/**
 * Handle build upload state change
 */
async function handleBuildUploadState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = getStateTransition(payload.data.attributes);
  const state = (newState || "PROCESSING") as BuildUploadState;
  const config =
    BUILD_UPLOAD_STATE_CONFIG[state] || BUILD_UPLOAD_STATE_CONFIG.PROCESSING;

  return sendSlackNotification(config, oldState, newState);
}

/**
 * Handle build bundle processing state change
 */
async function handleBuildBundleState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = getStateTransition(payload.data.attributes);
  const state = (newState || "PROCESSING") as BuildBundleProcessingState;
  const config =
    BUILD_BUNDLE_STATE_CONFIG[state] || BUILD_BUNDLE_STATE_CONFIG.PROCESSING;

  return sendSlackNotification(config, oldState, newState);
}

/**
 * Handle app store version state change
 */
async function handleAppVersionState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = getStateTransition(payload.data.attributes);
  const state = (newState || "PREPARE_FOR_SUBMISSION") as AppStoreVersionState;
  const config = APP_VERSION_STATE_CONFIG[state] || {
    color: "#808080",
    emoji: "📦",
    title: newState || "Unknown",
    message: `State changed to ${newState}.`,
  };

  return sendSlackNotification(config, oldState, newState);
}

/**
 * Handle beta app review submission state change
 */
async function handleBetaReviewState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = getStateTransition(payload.data.attributes);
  const state = (newState ||
    "WAITING_FOR_REVIEW") as BetaAppReviewSubmissionState;
  const config =
    BETA_REVIEW_STATE_CONFIG[state] ||
    BETA_REVIEW_STATE_CONFIG.WAITING_FOR_REVIEW;

  return sendSlackNotification(config, oldState, newState);
}

/**
 * Handle unknown event type
 */
async function handleUnknownEvent(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { type } = payload.data;
  const { oldState, newState } = getStateTransition(payload.data.attributes);

  return sendSlackNotification(
    {
      color: "#808080",
      emoji: "📬",
      title: "App Store Event",
      message: `Event: ${type}`,
    },
    oldState,
    newState
  );
}

export async function POST(request: Request) {
  slog("apple-webhook", "🍎 ========== APPLE WEBHOOK RECEIVED ==========");

  try {
    const secret = process.env.APPLE_WEBHOOK_SECRET;

    if (!secret) {
      slog("apple-webhook", "❌ APPLE_WEBHOOK_SECRET not configured");
      return new Response("Server configuration error", { status: 500 });
    }

    const rawBody = await request.text();

    // Log headers for debugging
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = key.toLowerCase().includes("signature")
        ? value.slice(0, 30) + "..."
        : value;
    });
    slog("apple-webhook", "📬 Request headers", headers);

    // Verify signature
    const signature =
      request.headers.get("X-Apple-Notification-Signature") ||
      request.headers.get("X-Apple-Signature");

    const isValid = await verifyAppleSignature(rawBody, signature, secret);

    if (!isValid) {
      slog("apple-webhook", "❌ Invalid signature - rejecting request");
      return new Response("Unauthorized", { status: 401 });
    }

    // Parse payload
    const payload: AppleWebhookPayload = JSON.parse(rawBody);
    const eventType = payload.data?.type;

    const { oldState, newState } = getStateTransition(
      payload.data?.attributes || {}
    );
    slog("apple-webhook", "📦 Webhook payload", {
      type: eventType,
      id: payload.data?.id,
      oldState,
      newState,
    });

    // Route to appropriate handler
    switch (eventType) {
      case "webhookPingCreated":
        slog("apple-webhook", "🏓 Ping event received");
        await handlePingEvent();
        break;

      case "buildUploadStateUpdated":
        slog("apple-webhook", "📤 Build upload state changed");
        await handleBuildUploadState(payload);
        break;

      case "buildBundleProcessingStateUpdated":
        slog("apple-webhook", "⚙️ Build processing state changed");
        await handleBuildBundleState(payload);
        break;

      case "appStoreVersionStateUpdated":
      case "appStoreVersionAppVersionStateUpdated":
        slog("apple-webhook", "📱 App version state changed");
        await handleAppVersionState(payload);
        break;

      case "betaAppReviewSubmissionStateUpdated":
        slog("apple-webhook", "🧪 Beta review state changed");
        await handleBetaReviewState(payload);
        break;

      default:
        slog("apple-webhook", `⚠️ Unknown event type: ${eventType}`);
        await handleUnknownEvent(payload);
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
