import type { OnboardingAnswers } from "./onboardingTypes";

/**
 * Helper to safely extract a string value from answers
 */
function getStringValue(
  answers: OnboardingAnswers,
  key: string
): string | undefined {
  const value = answers[key];
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

/**
 * Helper to safely extract an array value from answers
 */
function getArrayValue(
  answers: OnboardingAnswers,
  key: string
): string[] | undefined {
  const value = answers[key];
  if (Array.isArray(value) && value.length > 0) {
    return value.filter((v) => typeof v === "string" && v.trim().length > 0);
  }
  return undefined;
}

/**
 * Generates personalized loading messages for the reviews-loading step.
 * Returns exactly 6 messages focused on setting up the application.
 * Always returns usable messages even with zero answers.
 */
export function generateLoadingTexts(answers: OnboardingAnswers): string[] {
  const location = getArrayValue(answers, "location");
  const styles = getArrayValue(answers, "styles");
  const vibe = getArrayValue(answers, "vibe");
  const goal = getStringValue(answers, "goal");
  const userName = getStringValue(answers, "user-name");

  const messages: string[] = [];

  // Phase 1: Understanding preferences (setting up based on their vision)
  if (userName && messages.length < 1) {
    messages.push(`Understanding ${userName}'s vision`);
  } else {
    messages.push("Understanding your vision");
  }

  if (location && location.length > 0 && messages.length < 2) {
    const firstLocation = location[0];
    if (firstLocation !== "not_sure") {
      messages.push(`Setting up for ${firstLocation} placement`);
    } else {
      messages.push("Configuring placement options");
    }
  } else if (messages.length < 2) {
    messages.push("Configuring placement options");
  }

  // Phase 2: Applying preferences (tailoring the experience)
  if (styles && styles.length > 0 && messages.length < 3) {
    const firstStyle = styles[0];
    if (firstStyle !== "not_sure") {
      messages.push(`Tailoring to your style preferences`);
    } else {
      messages.push("Tailoring to your preferences");
    }
  } else if (messages.length < 3) {
    messages.push("Tailoring to your preferences");
  }

  if (vibe && vibe.length > 0 && messages.length < 4) {
    messages.push("Applying your aesthetic choices");
  } else if (messages.length < 4) {
    messages.push("Applying your preferences");
  }

  // Phase 3: Special configurations
  if (goal === "cover_up" && messages.length < 5) {
    messages.push("Setting up cover-up tools");
  } else if (messages.length < 5) {
    messages.push("Configuring your workspace");
  }

  // Phase 4: Finalization
  if (messages.length < 6) {
    messages.push("Almost ready");
  }

  // Ensure we always return exactly 6 messages
  const fallbackMessages = [
    "Personalizing your experience",
    "Setting up your dashboard",
    "Preparing your workspace",
  ];

  while (messages.length < 6) {
    const fallback = fallbackMessages.shift();
    if (fallback) {
      messages.push(fallback);
    } else {
      // Last resort fallback
      messages.push("Finalizing setup");
      break;
    }
  }

  // Return exactly 6 messages
  return messages.slice(0, 6);
}
