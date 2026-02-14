import i18n from '@/src/lib/i18n';
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
 * Returns exactly 3 high-impact messages that last longer for better readability.
 * Always returns usable messages even with zero answers.
 */
export function generateLoadingTexts(answers: OnboardingAnswers): string[] {
  // const location = getArrayValue(answers, "location");
  const styles = getArrayValue(answers, "styles");
  // const vibe = getArrayValue(answers, "vibe");
  const goal = getStringValue(answers, "goal");
  const userName = getStringValue(answers, "user-name");

  const messages: string[] = [];

  // Message 1: Personal acknowledgment - makes them feel heard
  if (userName) {
    messages.push(i18n.t('onboarding.loading.understandingVision', { name: userName }));
  } else {
    messages.push(i18n.t('onboarding.loading.understandingVisionDefault'));
  }

  // Message 2: Personalization - shows we're tailoring to their choices
  if (styles && styles.length > 0 && styles[0] !== "not_sure") {
    messages.push(i18n.t('onboarding.loading.tailoringDesigns'));
  } else if (goal === "cover_up") {
    messages.push(i18n.t('onboarding.loading.settingUpCoverUp'));
  } else {
    messages.push(i18n.t('onboarding.loading.personalizingExperience'));
  }

  // Message 3: Excitement/readiness - builds anticipation
  messages.push(i18n.t('onboarding.loading.preparingStudio'));

  // --- Commented out lower-impact messages ---
  // if (location && location.length > 0 && messages.length < 2) {
  //   const firstLocation = location[0];
  //   if (firstLocation !== "not_sure") {
  //     messages.push(`Setting up for ${firstLocation} placement`);
  //   } else {
  //     messages.push("Configuring placement options");
  //   }
  // }

  // if (vibe && vibe.length > 0) {
  //   messages.push("Applying your aesthetic choices");
  // }

  messages.push(i18n.t('onboarding.loading.configuringWorkspace'));
  // "Setting up your dashboard" - too generic
  // "Preparing your workspace" - redundant with "design studio"
  messages.push(i18n.t('onboarding.loading.applyingPreferences'));
  // --- End commented out ---

  // Return exactly 3 high-impact messages
  return messages.slice(0, 4);
}
