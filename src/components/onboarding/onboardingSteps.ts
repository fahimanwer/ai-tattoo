import { OnboardingAnswers, OnboardingStep } from "./onboardingTypes";

export const ONBOARDING_ANSWERS_VERSION = 1;

export const DEFAULT_ONBOARDING_IMAGE =
  "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/onboarding-v1.avif";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "before-after",
    kind: "beforeAfter",
    title: "onboarding.appTitle",
    description: "onboarding.appSubtitle",
    // title: "See the tattoo on your skin",
    // description: "Size it, move it, and see it in seconds.",
    imagePairs: [
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.female-ribs-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.female-ribs-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.male-arm-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.male-arm-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.male-chest-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.male-chest-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.male-shoulder-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.male-shoulder-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.calf-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.calf-male-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.calf-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.calf-male-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/3.calf-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/3.calf-male-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.arm-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.arm-male-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.arm-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/2.arm-male-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/3.arm-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/3.arm-male-after.avif",
      },
      {
        before:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/4.arm-male-before.avif",
        after:
          "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/4.arm-male-after.avif",
      },
    ],
  },
  {
    id: "user-name",
    kind: "text",
    title: "onboarding.whatsYourName",
    description: "onboarding.nameDescription",
    image: undefined,
    required: false,
    placeholder: "onboarding.namePlaceholder",
  },
  {
    id: "feature-tryon",
    kind: "feature",
    title: "onboarding.welcome",
    description: "onboarding.welcomeDescription",
    image:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.arm-male-after.avif",
  },
  {
    id: "user-description",
    kind: "multiChoice",
    title: "onboarding.describeYou",
    description: "onboarding.describeYouDescription",
    image: undefined,
    required: false,
    options: [
      { id: "artist", label: "onboarding.userDescription.artist", value: "artist" },
      { id: "client", label: "onboarding.userDescription.client", value: "client" },
      { id: "model", label: "onboarding.userDescription.model", value: "model" },
      { id: "explorer", label: "onboarding.userDescription.explorer", value: "explorer" },
    ],
  },
  // {
  //   id: "hero",
  //   kind: "hero",
  //   title: "No tattoo regrets",
  //   description: "Preview your tattoo before committing.",
  //   image: DEFAULT_ONBOARDING_IMAGE,
  //   cta: "Get started",
  //   cta2: "Sign In",
  //   required: false,
  // },
  {
    id: "goal",
    kind: "multiChoice",
    title: "onboarding.whatToDo",
    description: "onboarding.whatToDoDescription",
    image: undefined,
    required: false,
    options: [
      { id: "try-on", label: "onboarding.goal.tryOn", value: "try_on" },
      { id: "generate", label: "onboarding.goal.generate", value: "generate" },
      {
        id: "browse",
        label: "onboarding.goal.browse",
        value: "browse",
      },
      {
        id: "cover-up",
        label: "onboarding.goal.coverUp",
        value: "cover_up",
      },
    ],
  },
  {
    id: "feature-design",
    kind: "feature",
    title: "onboarding.designTattoo",
    description: "onboarding.designTattooDescription",
    image:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.arm-male-after.avif",
    video:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/Onboarding22.mov",
  },
  {
    id: "location",
    kind: "multiChoiceChips",
    title: "onboarding.whereTattoo",
    description: "onboarding.whereTattooDescription",
    image: undefined,
    required: false,
    options: [
      { id: "wrist", label: "onboarding.location.wrist", value: "wrist" },
      { id: "chest", label: "onboarding.location.chest", value: "chest" },
      { id: "hand", label: "onboarding.location.hand", value: "hand" },
      { id: "back", label: "onboarding.location.back", value: "back" },
      { id: "legs", label: "onboarding.location.legs", value: "legs" },
      { id: "forearm", label: "onboarding.location.forearm", value: "forearm" },
      { id: "neck", label: "onboarding.location.neck", value: "neck" },
      { id: "jaw", label: "onboarding.location.jaw", value: "jaw" },
      { id: "forehead", label: "onboarding.location.forehead", value: "forehead" },
      { id: "knuckles", label: "onboarding.location.knuckles", value: "knuckles" },
      { id: "fingers", label: "onboarding.location.fingers", value: "fingers" },
      { id: "cheek", label: "onboarding.location.cheek", value: "cheek" },
      { id: "shoulder", label: "onboarding.location.shoulder", value: "shoulder" },
      { id: "temple", label: "onboarding.location.temple", value: "temple" },
      { id: "ribs", label: "onboarding.location.ribs", value: "ribs" },
      { id: "abdomen", label: "onboarding.location.abdomen", value: "abdomen" },
      { id: "face", label: "onboarding.location.face", value: "face" },
      { id: "hips", label: "onboarding.location.hips", value: "hips" },
      { id: "thigh", label: "onboarding.location.thigh", value: "thigh" },
      { id: "tricep", label: "onboarding.location.tricep", value: "tricep" },
      { id: "bicep", label: "onboarding.location.bicep", value: "bicep" },
      { id: "collarbone", label: "onboarding.location.collarbone", value: "collarbone" },
      { id: "ankle", label: "onboarding.location.ankle", value: "ankle" },
      { id: "foot", label: "onboarding.location.foot", value: "foot" },
      { id: "palm", label: "onboarding.location.palm", value: "palm" },
      { id: "not-sure", label: "onboarding.location.notSure", value: "not_sure" },
    ],
  },

  {
    id: "styles",
    kind: "multiChoiceChips",
    title: "onboarding.pickStyles",
    description: "onboarding.pickStylesDescription",
    image: undefined,
    required: false,
    max: 4,
    options: [
      { id: "traditional", label: "onboarding.styles.traditional", value: "traditional" },
      { id: "realism", label: "onboarding.styles.realism", value: "realism" },
      { id: "minimal", label: "onboarding.styles.minimal", value: "minimal" },
      { id: "celtic", label: "onboarding.styles.celtic", value: "celtic" },
      { id: "blackwork", label: "onboarding.styles.blackwork", value: "blackwork" },
      { id: "illustrative", label: "onboarding.styles.illustrative", value: "illustrative" },
      { id: "lettering", label: "onboarding.styles.lettering", value: "lettering" },
      { id: "irezumi", label: "onboarding.styles.irezumi", value: "irezumi" },
      { id: "geometric", label: "onboarding.styles.geometric", value: "geometric" },
      { id: "religious", label: "onboarding.styles.religious", value: "religious" },
      { id: "anime", label: "onboarding.styles.anime", value: "anime" },
      { id: "fine-line", label: "onboarding.styles.fineLine", value: "fine_line" },
      { id: "dotwork", label: "onboarding.styles.dotwork", value: "dotwork" },
      { id: "linework", label: "onboarding.styles.linework", value: "linework" },
      { id: "calligraphy", label: "onboarding.styles.calligraphy", value: "calligraphy" },
      { id: "portrait", label: "onboarding.styles.portrait", value: "portrait" },
      { id: "floral", label: "onboarding.styles.floral", value: "floral" },
      { id: "polynesian", label: "onboarding.styles.polynesian", value: "polynesian" },
      { id: "tribal", label: "onboarding.styles.tribal", value: "tribal" },
      { id: "maori", label: "onboarding.styles.maori", value: "maori" },
      { id: "gothic", label: "onboarding.styles.gothic", value: "gothic" },
      { id: "patchwork", label: "onboarding.styles.patchwork", value: "patchwork" },
      { id: "abstract", label: "onboarding.styles.abstract", value: "abstract" },
      { id: "cyberpunk", label: "onboarding.styles.cyberpunk", value: "cyberpunk" },
      { id: "3d", label: "onboarding.styles.threeD", value: "3d" },
      { id: "astrology", label: "onboarding.styles.astrology", value: "astrology" },
    ],
  },

  {
    id: "timeframe",
    kind: "singleChoice",
    title: "onboarding.whenTattoo",
    description: "onboarding.whenTattooDescription",
    image: undefined,
    required: false,
    options: [
      { id: "this-week", label: "onboarding.timeframe.thisWeek", value: "this_week" },
      { id: "this-month", label: "onboarding.timeframe.thisMonth", value: "this_month" },
      { id: "this-year", label: "onboarding.timeframe.oneToThreeMonths", value: "this_year" },
      { id: "someday", label: "onboarding.timeframe.someday", value: "someday" },
    ],
  },

  {
    id: "vibe",
    kind: "multiChoiceChips",
    title: "onboarding.whatVibe",
    description: "onboarding.whatVibeDescription",
    image: undefined,
    required: false,
    options: [
      { id: "bold", label: "onboarding.vibe.bold", value: "bold" },
      { id: "confident", label: "onboarding.vibe.confident", value: "confident" },
      { id: "soft", label: "onboarding.vibe.soft", value: "soft" },
      { id: "dark", label: "onboarding.vibe.dark", value: "dark" },
      { id: "edgy", label: "onboarding.vibe.edgy", value: "edgy" },
      { id: "elegant", label: "onboarding.vibe.elegant", value: "elegant" },
      { id: "spiritual", label: "onboarding.vibe.spiritual", value: "spiritual" },
      { id: "cute", label: "onboarding.vibe.cute", value: "cute" },
      { id: "symbolic", label: "onboarding.vibe.symbolic", value: "symbolic" },
      { id: "playful", label: "onboarding.vibe.playful", value: "playful" },
      { id: "clean", label: "onboarding.vibe.clean", value: "clean" },
      { id: "modern", label: "onboarding.vibe.modern", value: "modern" },
      { id: "meaningful", label: "onboarding.vibe.meaningful", value: "meaningful" },
      {
        id: "personal-story",
        label: "onboarding.vibe.personalStory",
        value: "personal_story",
      },
      { id: "family", label: "onboarding.vibe.family", value: "family" },
      { id: "love", label: "onboarding.vibe.love", value: "love" },
      { id: "memory", label: "onboarding.vibe.memory", value: "memory" },
      { id: "rebirth", label: "onboarding.vibe.rebirth", value: "rebirth" },
      { id: "freedom", label: "onboarding.vibe.freedom", value: "freedom" },
      { id: "mystical", label: "onboarding.vibe.mystical", value: "mystical" },
      { id: "rebellious", label: "onboarding.vibe.rebellious", value: "rebellious" },
      { id: "serene", label: "onboarding.vibe.serene", value: "serene" },
      { id: "empowered", label: "onboarding.vibe.empowered", value: "empowered" },
      { id: "ethereal", label: "onboarding.vibe.ethereal", value: "ethereal" },
      { id: "fearless", label: "onboarding.vibe.fearless", value: "fearless" },
      { id: "wanderlust", label: "onboarding.vibe.wanderlust", value: "wanderlust" },
      { id: "transcendent", label: "onboarding.vibe.transcendent", value: "transcendent" },
    ],
  },
  {
    id: "reviews-loading",
    kind: "reviews",
    title: "onboarding.settingUp",
    description: undefined,
    image: undefined,
  },
  {
    id: "congratulations",
    kind: "congratulations",
    title: "onboarding.youreAllSet",
    description: "onboarding.youreAllSetDescription",
    image: undefined,
  },
];

export const STEP_INDEX_BY_ID = Object.fromEntries(
  ONBOARDING_STEPS.map((step, index) => [step.id, index])
);

export const getNextStepIndex = (
  step: OnboardingStep,
  currentIndex: number
) => {
  if (step.next) {
    const nextIndex = STEP_INDEX_BY_ID[step.next];
    if (typeof nextIndex === "number") {
      return nextIndex;
    }
  }
  return currentIndex + 1;
};

export const isStepComplete = (
  step: OnboardingStep,
  answers: OnboardingAnswers
) => {
  if (!step.required) {
    return true;
  }

  const answer = answers[step.id];

  if (step.kind === "singleChoice") {
    return typeof answer === "string" && answer.length > 0;
  }

  if (step.kind === "multiChoice" || step.kind === "multiChoiceChips") {
    return Array.isArray(answer) && answer.length > 0;
  }

  if (step.kind === "text") {
    return typeof answer === "string" && answer.trim().length > 0;
  }

  return true;
};
