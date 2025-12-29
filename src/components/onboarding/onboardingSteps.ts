import { OnboardingAnswers, OnboardingStep } from "./onboardingTypes";

export const ONBOARDING_ANSWERS_VERSION = 1;

export const DEFAULT_ONBOARDING_IMAGE =
  "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/onboarding-v1.avif";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "hero",
    kind: "hero",
    title: "See a tattoo on you before you commit",
    description: "Try-on + AI design in seconds. No regret.",
    image: DEFAULT_ONBOARDING_IMAGE,
    cta: "Get started",
    cta2: "Sign In",
    required: false,
  },
  {
    id: "goal",
    kind: "multiChoice",
    title: "What would you like to do?",
    description: undefined,
    image: undefined,
    required: false,
    options: [
      { id: "try-on", label: "Try tattoos on my photos", value: "try_on" },
      { id: "generate", label: "Generate tattoo ideas", value: "generate" },
      {
        id: "browse",
        label: "Just browsing or looking for inspiration",
        value: "browse",
      },
      {
        id: "cover-up",
        label: "Cover-up/Rework an existing tattoo",
        value: "cover_up",
      },
    ],
  },
  {
    id: "location",
    kind: "multiChoiceChips",
    title: "Where do you want the tattoo?",
    description: undefined,
    image: undefined,
    required: false,
    options: [
      { id: "wrist", label: "Wrist", value: "wrist" },
      { id: "chest", label: "Chest", value: "chest" },
      { id: "hand", label: "Hand", value: "hand" },
      { id: "back", label: "Back", value: "back" },
      { id: "legs", label: "Legs", value: "legs" },
      { id: "forearm", label: "Forearm", value: "forearm" },
      { id: "neck", label: "Neck", value: "neck" },
      { id: "jaw", label: "Jaw", value: "jaw" },
      { id: "forehead", label: "Forehead", value: "forehead" },
      { id: "knuckles", label: "Knuckles", value: "knuckles" },
      { id: "fingers", label: "Fingers", value: "fingers" },
      { id: "cheek", label: "Cheek", value: "cheek" },
      { id: "shoulder", label: "Shoulder", value: "shoulder" },
      { id: "temple", label: "Temple", value: "temple" },
      { id: "ribs", label: "Ribs", value: "ribs" },
      { id: "abdomen", label: "Abdomen", value: "abdomen" },
      { id: "face", label: "Face", value: "face" },
      { id: "hips", label: "Hips", value: "hips" },
      { id: "thigh", label: "Thigh", value: "thigh" },
      { id: "tricep", label: "Tricep", value: "tricep" },
      { id: "bicep", label: "Bicep", value: "bicep" },
      { id: "collarbone", label: "Collarbone", value: "collarbone" },
      { id: "ankle", label: "Ankle", value: "ankle" },
      { id: "foot", label: "Foot", value: "foot" },
      { id: "palm", label: "Palm", value: "palm" },
      { id: "not-sure", label: "Not sure", value: "not_sure" },
    ],
  },
  {
    id: "user-name",
    kind: "text",
    title: "What is your name?",
    description: "We'll use this to personalize your experience.",
    image: undefined,
    required: false,
    placeholder: "Your name",
  },
  {
    id: "user-description",
    kind: "multiChoice",
    title: "Which best describes you?",
    description: undefined,
    image: undefined,
    required: false,
    options: [
      { id: "artist", label: "Tattoo artist", value: "artist" },
      { id: "client", label: "Getting a tattoo", value: "client" },
      { id: "model", label: "Model/Influencer for tattoos", value: "model" },
      { id: "explorer", label: "Just exploring", value: "explorer" },
    ],
  },
  {
    id: "feature-tryon",
    kind: "feature",
    title: "We'll tailor Inkigo for you",
    description: "Inkigo adapts to your workflow and preferences.",
    image:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.calf-male-after.avif",
  },
  {
    id: "styles",
    kind: "multiChoiceChips",
    title: "Pick up to 5 styles you like",
    description: undefined,
    image: undefined,
    required: false,
    max: 5,
    options: [
      { id: "traditional", label: "Traditional", value: "traditional" },
      { id: "realism", label: "Realism", value: "realism" },
      { id: "minimal", label: "Minimal", value: "minimal" },
      { id: "celtic", label: "Celtic", value: "celtic" },
      { id: "blackwork", label: "Blackwork", value: "blackwork" },
      { id: "illustrative", label: "Illustrative", value: "illustrative" },
      { id: "lettering", label: "Lettering", value: "lettering" },
      { id: "irezumi", label: "Irezumi", value: "irezumi" },
      { id: "geometric", label: "Geometric", value: "geometric" },
      { id: "religious", label: "Religious", value: "religious" },
      { id: "anime", label: "Anime", value: "anime" },
      { id: "fine-line", label: "Fine Line", value: "fine_line" },
      { id: "dotwork", label: "Dotwork", value: "dotwork" },
      { id: "linework", label: "Linework", value: "linework" },
      { id: "calligraphy", label: "Calligraphy", value: "calligraphy" },
      { id: "portrait", label: "Portrait", value: "portrait" },
      { id: "floral", label: "Floral", value: "floral" },
      { id: "polynesian", label: "Polynesian", value: "polynesian" },
      { id: "tribal", label: "Tribal", value: "tribal" },
      { id: "maori", label: "Maori", value: "maori" },
      { id: "gothic", label: "Gothic", value: "gothic" },
      { id: "patchwork", label: "Patchwork", value: "patchwork" },
      { id: "abstract", label: "Abstract", value: "abstract" },
      { id: "cyberpunk", label: "Cyberpunk", value: "cyberpunk" },
      { id: "3d", label: "3D", value: "3d" },
      { id: "astrology", label: "Astrology", value: "astrology" },
      { id: "not-sure", label: "Not sure", value: "not_sure" },
    ],
  },
  {
    id: "feature-design",
    kind: "feature",
    title: "Design the tattoo you want",
    description:
      "Type a few words or upload an image and instantly generate unique tattoo designs.",
    image:
      "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/before-after/1.arm-male-after.avif",
  },
  {
    id: "timeframe",
    kind: "singleChoice",
    title: "When are you thinking of getting the tattoo?",
    description: undefined,
    image: undefined,
    required: false,
    options: [
      { id: "this-week", label: "This week", value: "this_week" },
      { id: "this-month", label: "This month", value: "this_month" },
      { id: "this-year", label: "In 1-3 months", value: "this_year" },
      { id: "someday", label: "Someday, I'm just exploring", value: "someday" },
    ],
  },
  {
    id: "before-after",
    kind: "beforeAfter",
    title: "See the tattoo on your skin",
    description: "Size it, move it, and see it in seconds.",
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
    id: "vibe",
    kind: "multiChoiceChips",
    title: "What vibe are you going for?",
    description: undefined,
    image: undefined,
    required: false,
    options: [
      { id: "bold", label: "Bold", value: "bold" },
      { id: "confident", label: "Confident", value: "confident" },
      { id: "soft", label: "Soft", value: "soft" },
      { id: "dark", label: "Dark", value: "dark" },
      { id: "edgy", label: "Edgy", value: "edgy" },
      { id: "elegant", label: "Elegant", value: "elegant" },
      { id: "spiritual", label: "Spiritual", value: "spiritual" },
      { id: "cute", label: "Cute", value: "cute" },
      { id: "symbolic", label: "Symbolic", value: "symbolic" },
      { id: "playful", label: "Playful", value: "playful" },
      { id: "clean", label: "Clean", value: "clean" },
      { id: "modern", label: "Modern", value: "modern" },
      { id: "meaningful", label: "Meaningful", value: "meaningful" },
      {
        id: "personal-story",
        label: "Personal story",
        value: "personal_story",
      },
      { id: "family", label: "Family", value: "family" },
      { id: "love", label: "Love", value: "love" },
      { id: "memory", label: "Memory", value: "memory" },
      { id: "rebirth", label: "Rebirth", value: "rebirth" },
      { id: "freedom", label: "Freedom", value: "freedom" },
      { id: "mystical", label: "Mystical", value: "mystical" },
      { id: "rebellious", label: "Rebellious", value: "rebellious" },
      { id: "serene", label: "Serene", value: "serene" },
      { id: "empowered", label: "Empowered", value: "empowered" },
      { id: "ethereal", label: "Ethereal", value: "ethereal" },
      { id: "fearless", label: "Fearless", value: "fearless" },
      { id: "wanderlust", label: "Wanderlust", value: "wanderlust" },
      { id: "transcendent", label: "Transcendent", value: "transcendent" },
    ],
  },
  {
    id: "reviews-loading",
    kind: "reviews",
    title: "Setting things up for you",
    description: undefined,
    image: undefined,
  },
  {
    id: "congratulations",
    kind: "congratulations",
    title: "Congratulations!",
    description: "You're all set to get started.",
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
