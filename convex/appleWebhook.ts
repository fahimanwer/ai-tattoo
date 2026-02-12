import { internalAction } from "./_generated/server";
import { v } from "convex/values";

// Event types from App Store Connect
type WebhookEventType =
  | "webhookPingCreated"
  | "buildUploadStateUpdated"
  | "buildBundleProcessingStateUpdated"
  | "appStoreVersionStateUpdated"
  | "appStoreVersionAppVersionStateUpdated"
  | "betaAppReviewSubmissionStateUpdated";

type BuildUploadState = "PROCESSING" | "COMPLETE" | "FAILED";
type BuildBundleProcessingState = "PROCESSING" | "VALID" | "INVALID" | "FAILED";
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
type BetaAppReviewSubmissionState =
  | "WAITING_FOR_REVIEW"
  | "IN_REVIEW"
  | "REJECTED"
  | "APPROVED";

interface MessageConfig {
  color: string;
  emoji: string;
  title: string;
  message: string;
}

interface AppleWebhookPayload {
  data: {
    type: WebhookEventType;
    id: string;
    version?: number;
    attributes: {
      timestamp?: string;
      oldState?: string;
      newState?: string;
      oldValue?: string;
      newValue?: string;
    };
    relationships?: {
      instance?: { data?: { type: string; id: string }; links?: { self: string } };
      app?: { data?: { type: string; id: string } };
      build?: { data?: { type: string; id: string } };
    };
  };
}

const BUILD_UPLOAD_STATE_CONFIG: Record<BuildUploadState, MessageConfig> = {
  PROCESSING: { color: "#FFA500", emoji: "hourglass", title: "Build Uploading", message: "Uploading your build to App Store Connect..." },
  COMPLETE: { color: "#36a64f", emoji: "white_check_mark", title: "Build Uploaded", message: "Build uploaded successfully!" },
  FAILED: { color: "#E01E5A", emoji: "x", title: "Upload Failed", message: "Build upload failed. Check Xcode for details." },
};

const BUILD_BUNDLE_STATE_CONFIG: Record<BuildBundleProcessingState, MessageConfig> = {
  PROCESSING: { color: "#FFA500", emoji: "hourglass", title: "Processing Build", message: "Processing your build..." },
  VALID: { color: "#36a64f", emoji: "white_check_mark", title: "Build Ready", message: "Build processed and ready for TestFlight!" },
  INVALID: { color: "#E01E5A", emoji: "warning", title: "Invalid Build", message: "Build is invalid. Check App Store Connect for details." },
  FAILED: { color: "#E01E5A", emoji: "x", title: "Processing Failed", message: "Build processing failed. Check App Store Connect for details." },
};

const APP_VERSION_STATE_CONFIG: Record<AppStoreVersionState, MessageConfig> = {
  ACCEPTED: { color: "#36a64f", emoji: "white_check_mark", title: "Accepted", message: "App version accepted!" },
  DEVELOPER_REJECTED: { color: "#FFA500", emoji: "back", title: "Developer Rejected", message: "You rejected this version from review." },
  DEVELOPER_REMOVED_FROM_SALE: { color: "#808080", emoji: "no_entry_sign", title: "Removed from Sale", message: "You removed this version from sale." },
  IN_REVIEW: { color: "#007AFF", emoji: "eyes", title: "In Review", message: "Apple is reviewing your app. Usually 24-48 hours." },
  INVALID_BINARY: { color: "#E01E5A", emoji: "x", title: "Invalid Binary", message: "Binary is invalid. Upload a new build." },
  METADATA_REJECTED: { color: "#E01E5A", emoji: "memo", title: "Metadata Rejected", message: "App metadata was rejected. Check App Store Connect." },
  PENDING_APPLE_RELEASE: { color: "#36a64f", emoji: "apple", title: "Pending Apple Release", message: "Approved! Waiting for Apple to release." },
  PENDING_CONTRACT: { color: "#FFA500", emoji: "page_facing_up", title: "Pending Contract", message: "Waiting for contract agreement." },
  PENDING_DEVELOPER_RELEASE: { color: "#36a64f", emoji: "rocket", title: "Ready to Release", message: "Approved! Release whenever you're ready." },
  PREPARE_FOR_SUBMISSION: { color: "#808080", emoji: "clipboard", title: "Preparing", message: "Preparing for submission." },
  PREORDER_READY_FOR_SALE: { color: "#36a64f", emoji: "shopping_cart", title: "Pre-order Ready", message: "Pre-order is ready for sale!" },
  PROCESSING_FOR_APP_STORE: { color: "#FFA500", emoji: "hourglass", title: "Processing", message: "Processing for App Store..." },
  READY_FOR_REVIEW: { color: "#007AFF", emoji: "outbox_tray", title: "Ready for Review", message: "Ready to submit for review." },
  READY_FOR_SALE: { color: "#36a64f", emoji: "tada", title: "Live!", message: "Your app is now live on the App Store!" },
  REJECTED: { color: "#E01E5A", emoji: "x", title: "Rejected", message: "App was rejected. Check App Store Connect." },
  REMOVED_FROM_SALE: { color: "#808080", emoji: "no_entry_sign", title: "Removed from Sale", message: "Version removed from sale." },
  REPLACED_WITH_NEW_VERSION: { color: "#808080", emoji: "arrows_counterclockwise", title: "Version Replaced", message: "Replaced with a newer version." },
  WAITING_FOR_EXPORT_COMPLIANCE: { color: "#FFA500", emoji: "clipboard", title: "Export Compliance", message: "Complete export compliance info." },
  WAITING_FOR_REVIEW: { color: "#007AFF", emoji: "hourglass", title: "In Queue", message: "Submitted! In the review queue. Usually 24-48 hours." },
};

const BETA_REVIEW_STATE_CONFIG: Record<BetaAppReviewSubmissionState, MessageConfig> = {
  WAITING_FOR_REVIEW: { color: "#007AFF", emoji: "hourglass", title: "TestFlight Pending", message: "Waiting for TestFlight review." },
  IN_REVIEW: { color: "#007AFF", emoji: "eyes", title: "TestFlight In Review", message: "TestFlight build is being reviewed." },
  REJECTED: { color: "#E01E5A", emoji: "x", title: "TestFlight Rejected", message: "TestFlight build rejected. Check App Store Connect." },
  APPROVED: { color: "#36a64f", emoji: "white_check_mark", title: "TestFlight Approved", message: "Build approved for external testing!" },
};

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyAppleSignature(
  payload: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) {
    console.warn("[APPLE WEBHOOK] No signature header provided - skipping verification");
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
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const computedHex = bufferToHex(signatureBuffer);
    return computedHex === receivedHex;
  } catch (error) {
    console.error("[APPLE WEBHOOK] Signature verification error:", error);
    return false;
  }
}

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

async function sendSlackNotification(
  webhookUrl: string,
  config: MessageConfig,
  oldState?: string,
  newState?: string
): Promise<boolean> {
  const transitionText =
    oldState && newState ? `${oldState} -> ${newState}` : newState || "";

  const blocks: any[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:${config.emoji}: *${config.title}*\n${config.message}`,
      },
    },
  ];

  const contextParts: string[] = [];
  if (transitionText) contextParts.push(transitionText);
  contextParts.push(formatTimestamp());

  blocks.push({
    type: "context",
    elements: [{ type: "mrkdwn", text: contextParts.join(" | ") }],
  });

  const slackPayload = {
    attachments: [{ color: config.color, blocks }],
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackPayload),
  });

  if (!response.ok) {
    console.error("[APPLE WEBHOOK] Slack notification failed:", response.status);
    return false;
  }

  return true;
}

function getStateTransition(attributes: AppleWebhookPayload["data"]["attributes"]) {
  return {
    oldState: attributes.oldState || attributes.oldValue,
    newState: attributes.newState || attributes.newValue,
  };
}

export const processAppleWebhook = internalAction({
  args: {
    rawBody: v.string(),
    signature: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const secret = process.env.APPLE_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error("APPLE_WEBHOOK_SECRET not configured");
    }

    // Verify signature
    const isValid = await verifyAppleSignature(args.rawBody, args.signature ?? null, secret);
    if (!isValid) {
      throw new Error("Invalid signature");
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("[APPLE WEBHOOK] SLACK_WEBHOOK_URL not configured");
      return;
    }

    const payload: AppleWebhookPayload = JSON.parse(args.rawBody);
    const eventType = payload.data?.type;
    const { oldState, newState } = getStateTransition(payload.data?.attributes || {});

    console.log("[APPLE WEBHOOK] Processing event:", { type: eventType, id: payload.data?.id, oldState, newState });

    let config: MessageConfig;

    switch (eventType) {
      case "webhookPingCreated":
        config = { color: "#36a64f", emoji: "apple", title: "Webhook Connected", message: "App Store Connect webhook connected." };
        break;
      case "buildUploadStateUpdated": {
        const state = (newState || "PROCESSING") as BuildUploadState;
        config = BUILD_UPLOAD_STATE_CONFIG[state] || BUILD_UPLOAD_STATE_CONFIG.PROCESSING;
        break;
      }
      case "buildBundleProcessingStateUpdated": {
        const state = (newState || "PROCESSING") as BuildBundleProcessingState;
        config = BUILD_BUNDLE_STATE_CONFIG[state] || BUILD_BUNDLE_STATE_CONFIG.PROCESSING;
        break;
      }
      case "appStoreVersionStateUpdated":
      case "appStoreVersionAppVersionStateUpdated": {
        const state = (newState || "PREPARE_FOR_SUBMISSION") as AppStoreVersionState;
        config = APP_VERSION_STATE_CONFIG[state] || {
          color: "#808080",
          emoji: "package",
          title: newState || "Unknown",
          message: `State changed to ${newState}.`,
        };
        break;
      }
      case "betaAppReviewSubmissionStateUpdated": {
        const state = (newState || "WAITING_FOR_REVIEW") as BetaAppReviewSubmissionState;
        config = BETA_REVIEW_STATE_CONFIG[state] || BETA_REVIEW_STATE_CONFIG.WAITING_FOR_REVIEW;
        break;
      }
      default:
        config = { color: "#808080", emoji: "mailbox_with_mail", title: "App Store Event", message: `Event: ${eventType}` };
    }

    await sendSlackNotification(webhookUrl, config, oldState, newState);
    console.log("[APPLE WEBHOOK] Webhook processed successfully");
  },
});
