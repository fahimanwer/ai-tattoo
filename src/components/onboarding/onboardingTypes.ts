export type StepKind =
  | "hero"
  | "singleChoice"
  | "multiChoiceChips"
  | "multiChoice"
  | "text"
  | "feature"
  | "beforeAfter"
  | "congratulations"
  | "reviews";

export type ChoiceOption = {
  id: string;
  label: string;
  value: string;
};

export type OnboardingStepBase = {
  id: string;
  kind: StepKind;
  title?: string;
  description?: string;
  image?: string;
  cta?: string;
  cta2?: string;
  required?: boolean;
  next?: string;
};

export type SingleChoiceStep = OnboardingStepBase & {
  kind: "singleChoice";
  options: ChoiceOption[];
};

export type MultiChoiceStep = OnboardingStepBase & {
  kind: "multiChoice" | "multiChoiceChips";
  options: ChoiceOption[];
  max?: number;
};

export type TextStep = OnboardingStepBase & {
  kind: "text";
  placeholder?: string;
};

export type HeroStep = OnboardingStepBase & {
  kind: "hero";
};

export type FeatureStep = OnboardingStepBase & {
  kind: "feature";
};

export type BeforeAfterStep = OnboardingStepBase & {
  kind: "beforeAfter";
};

export type CongratulationsStep = OnboardingStepBase & {
  kind: "congratulations";
};

export type ReviewsStep = OnboardingStepBase & {
  kind: "reviews";
  timeout?: number; // Duration in ms to show loading state
};

export type OnboardingStep =
  | SingleChoiceStep
  | MultiChoiceStep
  | TextStep
  | HeroStep
  | FeatureStep
  | BeforeAfterStep
  | CongratulationsStep
  | ReviewsStep;

export type OnboardingAnswers = Record<string, string | string[]>;
