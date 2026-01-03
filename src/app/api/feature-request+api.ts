import { slog } from "@/lib/log";

/**
 * Feature Request API Handler
 *
 * Receives feature requests from users and sends formatted Slack notifications.
 */

interface FeatureRequestPayload {
  message: string;
  userId?: string;
  userEmail?: string;
}

/**
 * Send Slack notification for feature request
 */
async function sendSlackNotification(
  message: string,
  userId?: string,
  userEmail?: string
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    slog("feature-request", "⚠️ SLACK_WEBHOOK_URL not configured");
    return false;
  }

  // Build user info text if available
  const userInfo = [];
  if (userId) {
    userInfo.push(`User ID: ${userId}`);
  }
  if (userEmail) {
    userInfo.push(`Email: ${userEmail}`);
  }
  const userInfoText =
    userInfo.length > 0 ? `\n\n*User Info:*\n${userInfo.join("\n")}` : "";

  const blocks: any[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `💡 *New Feature Request*\n\n${message}${userInfoText}`,
      },
    },
  ];

  // Add timestamp
  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: new Date().toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      },
    ],
  });

  const slackPayload = {
    attachments: [
      {
        color: "#36a64f",
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
      slog("feature-request", "❌ Slack notification failed", {
        status: response.status,
        response: responseText,
      });
      return false;
    }

    slog("feature-request", "✅ Feature request sent to Slack");
    return true;
  } catch (error) {
    slog("feature-request", "❌ Slack notification error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}

export async function POST(request: Request) {
  slog("feature-request", "💡 ========== FEATURE REQUEST RECEIVED ==========");

  try {
    const body: FeatureRequestPayload = await request.json();
    const { message, userId, userEmail } = body;

    if (!message || message.trim().length === 0) {
      slog("feature-request", "❌ Empty message received");
      return new Response("Message is required", { status: 400 });
    }

    const success = await sendSlackNotification(
      message.trim(),
      userId,
      userEmail
    );

    if (!success) {
      return new Response("Failed to send feature request", { status: 500 });
    }

    slog("feature-request", "✅ Feature request processed successfully");
    slog("feature-request", "========== END FEATURE REQUEST ==========\n");

    return new Response("OK", { status: 200 });
  } catch (error) {
    slog("feature-request", "❌ Error processing feature request", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    slog(
      "feature-request",
      "========== END FEATURE REQUEST (ERROR) ==========\n"
    );
    return new Response("Internal Server Error", { status: 500 });
  }
}
