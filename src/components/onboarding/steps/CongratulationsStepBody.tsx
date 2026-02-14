import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { SymbolView } from "expo-symbols";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "../../ui/Text";
import type {
  CongratulationsStep,
  OnboardingAnswers,
} from "../onboardingTypes";

type CongratulationsStepBodyProps = {
  step: CongratulationsStep;
  answers?: OnboardingAnswers;
};

type Feature = {
  icon: string;
  title: string;
  description: string;
};

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
 * Generate personalized features based on user's answers
 */
function generateFeatures(answers: OnboardingAnswers): Feature[] {
  const goals = getArrayValue(answers, "goal");
  const userType = getArrayValue(answers, "user-description");
  const timeframe = getStringValue(answers, "timeframe");
  const locations = getArrayValue(answers, "location");
  const styles = getArrayValue(answers, "styles");

  const features: Feature[] = [];

  // Core feature based on goals
  if (goals?.includes("try_on")) {
    features.push({
      icon: "camera.viewfinder",
      title: "Try-On Technology",
      description: "See tattoos on your skin before committing",
    });
  }

  if (goals?.includes("generate")) {
    features.push({
      icon: "wand.and.stars",
      title: "AI Tattoo Generator",
      description: "Create unique designs from your ideas",
    });
  }

  if (goals?.includes("cover_up")) {
    features.push({
      icon: "arrow.triangle.2.circlepath",
      title: "Cover-Up Assistant",
      description: "Transform existing tattoos into new art",
    });
  }

  // Artist-specific features
  if (userType?.includes("artist")) {
    features.push({
      icon: "paintbrush.pointed.fill",
      title: "Artist Tools",
      description: "Show clients designs on their body instantly",
    });
  }

  // Location-based feature
  if (locations && locations.length > 0 && !locations.includes("not_sure")) {
    features.push({
      icon: "figure.stand",
      title: "Precise Placement",
      description: `Perfect sizing for your ${locations[0]} tattoo`,
    });
  }

  // Style-based feature
  if (styles && styles.length > 0 && !styles.includes("not_sure")) {
    features.push({
      icon: "sparkles",
      title: "Style-Matched Designs",
      description: `Curated ${styles[0]} tattoo inspiration`,
    });
  }

  // Timeframe urgency
  if (timeframe === "this_week" || timeframe === "this_month") {
    features.push({
      icon: "clock.fill",
      title: "Ready When You Are",
      description: "Start designing today, ink tomorrow",
    });
  }

  // Default features to fill up to 3 if needed
  const defaultFeatures: Feature[] = [
    {
      icon: "camera.viewfinder",
      title: "Realistic Try-On",
      description: "See exactly how it will look on you",
    },
    {
      icon: "square.and.arrow.down",
      title: "Save & Share",
      description: "Keep your favorites and share with your artist",
    },
    {
      icon: "wand.and.stars",
      title: "AI Design Studio",
      description: "Generate unique tattoo designs instantly",
    },
  ];

  // Add default features until we have at least 3
  for (const defaultFeature of defaultFeatures) {
    if (features.length >= 3) break;
    if (!features.find((f) => f.icon === defaultFeature.icon)) {
      features.push(defaultFeature);
    }
  }

  // Return top 3 most relevant features
  return features.slice(0, 3);
}

/**
 * Generate personalized greeting based on user type
 */
function getPersonalizedGreeting(answers: OnboardingAnswers): string {
  const userType = getArrayValue(answers, "user-description");
  const goals = getArrayValue(answers, "goal");

  if (userType?.includes("artist")) {
    return "Your new client experience tool is ready";
  }

  if (goals?.includes("cover_up")) {
    return "Ready to transform your tattoo";
  }

  if (goals?.includes("generate")) {
    return "Your AI design studio awaits";
  }

  return "Your tattoo journey begins now";
}

/**
 * Generate personalized urgency message based on user type and goals
 */
function getUrgencyMessage(answers: OnboardingAnswers): string {
  const userType = getArrayValue(answers, "user-description");
  const goals = getArrayValue(answers, "goal");

  // Artist-specific message
  if (userType?.includes("artist")) {
    return "Show clients real previews instantly.";
  }

  // Cover-up focused message
  if (goals?.includes("cover_up")) {
    return "Fix your tattoo with confidence.";
  }

  // Try-on focused message
  if (goals?.includes("try_on")) {
    return "Try your tattoo on before you commit.";
  }

  // Default: Value + emotion (works for everyone)
  return "Unlimited designs. Zero regret.";
}

export function CongratulationsStepBody({
  step,
  answers = {},
}: CongratulationsStepBodyProps) {
  const { isDark } = useTheme();
  const features = useMemo(() => generateFeatures(answers), [answers]);
  const greeting = useMemo(() => getPersonalizedGreeting(answers), [answers]);
  const urgencyMessage = useMemo(() => getUrgencyMessage(answers), [answers]);

  return (
    <View style={styles.container}>
      {/* Personalized Subheading */}
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.header}
      >
        <Text type="lg" style={styles.subtext}>
          {greeting}
        </Text>
      </Animated.View>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Animated.View
            key={feature.icon}
            entering={FadeInDown.delay(300 + index * 150).duration(500)}
            style={[
              styles.featureCard,
              {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              ]}
            >
              <SymbolView
                name={feature.icon as any}
                size={24}
                tintColor={isDark ? "white" : Color.zinc[900]}
              />
            </View>
            <View style={styles.featureContent}>
              <Text
                type="base"
                weight="semibold"
                style={{
                  color: isDark ? "white" : Color.zinc[900],
                }}
              >
                {feature.title}
              </Text>
              <Text type="sm" style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Urgency Message */}
      <Animated.View
        entering={FadeInDown.delay(800).duration(500)}
        style={styles.urgencyContainer}
      >
        <Text
          type="base"
          weight="medium"
          style={{
            color: isDark ? "white" : Color.zinc[900],
            textAlign: "center",
          }}
        >
          {urgencyMessage}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  subtext: {
    textAlign: "center",
    color: Color.grayscale[500],
    marginTop: 8,
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureContent: {
    flex: 1,
  },
  // featureTitle color is now inline (theme-aware)
  featureDescription: {
    color: Color.grayscale[500],
    marginTop: 2,
  },
  urgencyContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  // urgencyText styles are now inline (theme-aware)
});
