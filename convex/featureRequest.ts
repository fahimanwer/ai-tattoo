import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const submitFeatureRequest = internalAction({
  args: {
    message: v.string(),
    userId: v.optional(v.string()),
    userEmail: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (_ctx, args) => {
    const { message, userId, userEmail } = args;

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("[FEATURE REQUEST] SLACK_WEBHOOK_URL not configured");
      throw new Error("Slack webhook not configured");
    }

    // Build user info text
    const userInfo: string[] = [];
    if (userId) userInfo.push(`User ID: ${userId}`);
    if (userEmail) userInfo.push(`Email: ${userEmail}`);
    const userInfoText =
      userInfo.length > 0 ? `\n\n*User Info:*\n${userInfo.join("\n")}` : "";

    const blocks = [
      {
        type: "section" as const,
        text: {
          type: "mrkdwn" as const,
          text: `*New Feature Request*\n\n${message}${userInfoText}`,
        },
      },
      {
        type: "context" as const,
        elements: [
          {
            type: "mrkdwn" as const,
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
      },
    ];

    const slackPayload = {
      attachments: [
        {
          color: "#36a64f",
          blocks,
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error("[FEATURE REQUEST] Slack notification failed:", {
        status: response.status,
        response: responseText,
      });
      throw new Error("Failed to send feature request to Slack");
    }

    console.log("[FEATURE REQUEST] Feature request sent to Slack");
    return null;
  },
});
