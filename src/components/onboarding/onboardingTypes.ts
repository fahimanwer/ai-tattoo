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

export type OnboardingStep =
  | SingleChoiceStep
  | MultiChoiceStep
  | TextStep
  | (OnboardingStepBase & {
      kind: "hero" | "feature" | "beforeAfter" | "congratulations" | "reviews";
    });

export type OnboardingAnswers = Record<string, string | string[]>;
