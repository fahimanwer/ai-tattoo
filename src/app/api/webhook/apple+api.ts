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
      // For state change events
      oldState?: string;
      newState?: string;
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
    message: "Your build is being uploaded to App Store Connect.",
  },
  COMPLETE: {
    color: "#36a64f",
    emoji: "✅",
    title: "Build Upload Complete",
    message: "Your build has been uploaded successfully!",
  },
  FAILED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Build Upload Failed",
    message: "Build upload failed. Please check Xcode for details.",
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
    title: "Build Processing",
    message: "Your build is being processed by App Store Connect.",
  },
  VALID: {
    color: "#36a64f",
    emoji: "✅",
    title: "Build Ready for Testing",
    message: "Your build has been processed and is ready for TestFlight! 🎉",
  },
  INVALID: {
    color: "#E01E5A",
    emoji: "⚠️",
    title: "Build Invalid",
    message:
      "Your build is invalid. Please check App Store Connect for details.",
  },
  FAILED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Build Processing Failed",
    message:
      "Build processing failed. Please check App Store Connect for details.",
  },
};

// App store version state config
const APP_VERSION_STATE_CONFIG: Record<AppStoreVersionState, MessageConfig> = {
  ACCEPTED: {
    color: "#36a64f",
    emoji: "✅",
    title: "Version Accepted",
    message: "Your app version has been accepted!",
  },
  DEVELOPER_REJECTED: {
    color: "#FFA500",
    emoji: "🔙",
    title: "Developer Rejected",
    message: "You've rejected this version from review.",
  },
  DEVELOPER_REMOVED_FROM_SALE: {
    color: "#808080",
    emoji: "🚫",
    title: "Removed from Sale",
    message: "You've removed this version from sale.",
  },
  IN_REVIEW: {
    color: "#007AFF",
    emoji: "👀",
    title: "In Review",
    message: "Your app is being reviewed by Apple! Usually takes 24-48 hours.",
  },
  INVALID_BINARY: {
    color: "#E01E5A",
    emoji: "❌",
    title: "Invalid Binary",
    message:
      "The binary for this version is invalid. Please upload a new build.",
  },
  METADATA_REJECTED: {
    color: "#E01E5A",
    emoji: "📝",
    title: "Metadata Rejected",
    message:
      "Your app metadata was rejected. Please check App Store Connect for details.",
  },
  PENDING_APPLE_RELEASE: {
    color: "#36a64f",
    emoji: "🍎",
    title: "Pending Apple Release",
    message: "Your app is approved and waiting for Apple to release it!",
  },
  PENDING_CONTRACT: {
    color: "#FFA500",
    emoji: "📄",
    title: "Pending Contract",
    message: "Waiting for contract agreement completion.",
  },
  PENDING_DEVELOPER_RELEASE: {
    color: "#36a64f",
    emoji: "🚀",
    title: "Ready to Release",
    message: "Your app is approved! Release it when you're ready.",
  },
  PREPARE_FOR_SUBMISSION: {
    color: "#808080",
    emoji: "📋",
    title: "Preparing for Submission",
    message: "Version is being prepared for submission.",
  },
  PREORDER_READY_FOR_SALE: {
    color: "#36a64f",
    emoji: "🛒",
    title: "Pre-order Ready",
    message: "Your app pre-order is ready for sale!",
  },
  PROCESSING_FOR_APP_STORE: {
    color: "#FFA500",
    emoji: "⏳",
    title: "Processing for App Store",
    message: "Your app is being processed for the App Store.",
  },
  READY_FOR_REVIEW: {
    color: "#007AFF",
    emoji: "📤",
    title: "Ready for Review",
    message: "Your app is ready to be submitted for review.",
  },
  READY_FOR_SALE: {
    color: "#36a64f",
    emoji: "🎉",
    title: "Live on App Store!",
    message: "Congratulations! Your app is now live on the App Store! 🥳",
  },
  REJECTED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "App Rejected",
    message:
      "Your app was rejected. Please check App Store Connect for details.",
  },
  REMOVED_FROM_SALE: {
    color: "#808080",
    emoji: "🚫",
    title: "Removed from Sale",
    message: "This version has been removed from sale.",
  },
  REPLACED_WITH_NEW_VERSION: {
    color: "#808080",
    emoji: "🔄",
    title: "Version Replaced",
    message: "This version has been replaced with a newer version.",
  },
  WAITING_FOR_EXPORT_COMPLIANCE: {
    color: "#FFA500",
    emoji: "📋",
    title: "Export Compliance Required",
    message: "Please complete export compliance information.",
  },
  WAITING_FOR_REVIEW: {
    color: "#007AFF",
    emoji: "⏳",
    title: "Waiting for Review",
    message: "Your app is in the review queue. Usually takes 24-48 hours.",
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
    title: "TestFlight Review Pending",
    message: "Your build is waiting for TestFlight beta review.",
  },
  IN_REVIEW: {
    color: "#007AFF",
    emoji: "👀",
    title: "TestFlight In Review",
    message: "Your build is being reviewed for TestFlight.",
  },
  REJECTED: {
    color: "#E01E5A",
    emoji: "❌",
    title: "TestFlight Review Rejected",
    message:
      "Your TestFlight build was rejected. Check App Store Connect for details.",
  },
  APPROVED: {
    color: "#36a64f",
    emoji: "✅",
    title: "TestFlight Approved",
    message: "Your build is approved for external TestFlight testing! 🎉",
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

// App Store Connect URLs
const APP_STORE_CONNECT_URL =
  "https://appstoreconnect.apple.com/teams/44a10798-a75d-4b45-8c9d-0b7656df7976/apps/6751748193";
const TESTFLIGHT_URL = `${APP_STORE_CONNECT_URL}/testflight/ios`;
const APP_STORE_URL = `${APP_STORE_CONNECT_URL}/appstore`;

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
  eventCategory: string,
  oldState?: string,
  newState?: string,
  buttonUrl?: string,
  buttonText?: string
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    slog("apple-webhook", "⚠️ SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const transitionText =
    oldState && newState
      ? `${oldState} → *${newState}*`
      : newState
      ? `*${newState}*`
      : "";

  const blocks: any[] = [
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
  ];

  // Add status fields if we have state info
  if (transitionText) {
    blocks.push({
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
    });
  }

  // Add action button if provided
  if (buttonUrl && buttonText) {
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: buttonText,
            emoji: true,
          },
          url: buttonUrl,
          style: config.color === "#36a64f" ? "primary" : undefined,
        },
      ],
    });
  }

  // Add timestamp
  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `📅 ${formatTimestamp()} • ${eventCategory}`,
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
  return sendSlackNotification(
    {
      color: "#36a64f",
      emoji: "🍎",
      title: "Webhook Connected",
      message:
        "App Store Connect webhook is now connected! You'll receive notifications here for build and app status changes.",
    },
    "Ping"
  );
}

/**
 * Handle build upload state change
 */
async function handleBuildUploadState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = payload.data.attributes;
  const state = (newState || "PROCESSING") as BuildUploadState;
  const config =
    BUILD_UPLOAD_STATE_CONFIG[state] || BUILD_UPLOAD_STATE_CONFIG.PROCESSING;

  return sendSlackNotification(
    config,
    "Build Upload",
    oldState,
    newState,
    TESTFLIGHT_URL,
    "📱 Open TestFlight"
  );
}

/**
 * Handle build bundle processing state change
 */
async function handleBuildBundleState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = payload.data.attributes;
  const state = (newState || "PROCESSING") as BuildBundleProcessingState;
  const config =
    BUILD_BUNDLE_STATE_CONFIG[state] || BUILD_BUNDLE_STATE_CONFIG.PROCESSING;

  return sendSlackNotification(
    config,
    "Build Processing",
    oldState,
    newState,
    TESTFLIGHT_URL,
    "📱 Open TestFlight"
  );
}

/**
 * Handle app store version state change
 */
async function handleAppVersionState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = payload.data.attributes;
  const state = (newState || "PREPARE_FOR_SUBMISSION") as AppStoreVersionState;
  const config = APP_VERSION_STATE_CONFIG[state] || {
    color: "#808080",
    emoji: "📦",
    title: `Version State: ${newState}`,
    message: `App version state changed to ${newState}.`,
  };

  return sendSlackNotification(
    config,
    "App Store Version",
    oldState,
    newState,
    APP_STORE_URL,
    "🍎 Open App Store Connect"
  );
}

/**
 * Handle beta app review submission state change
 */
async function handleBetaReviewState(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { oldState, newState } = payload.data.attributes;
  const state = (newState ||
    "WAITING_FOR_REVIEW") as BetaAppReviewSubmissionState;
  const config =
    BETA_REVIEW_STATE_CONFIG[state] ||
    BETA_REVIEW_STATE_CONFIG.WAITING_FOR_REVIEW;

  return sendSlackNotification(
    config,
    "TestFlight Review",
    oldState,
    newState,
    TESTFLIGHT_URL,
    "📱 Open TestFlight"
  );
}

/**
 * Handle unknown event type
 */
async function handleUnknownEvent(
  payload: AppleWebhookPayload
): Promise<boolean> {
  const { type } = payload.data;
  const { oldState, newState } = payload.data.attributes;

  return sendSlackNotification(
    {
      color: "#808080",
      emoji: "📬",
      title: "App Store Connect Event",
      message: `Received event: ${type}`,
    },
    type,
    oldState,
    newState,
    APP_STORE_CONNECT_URL,
    "🍎 Open App Store Connect"
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

    slog("apple-webhook", "📦 Webhook payload", {
      type: eventType,
      id: payload.data?.id,
      oldState: payload.data?.attributes?.oldState,
      newState: payload.data?.attributes?.newState,
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
