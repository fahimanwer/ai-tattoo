import { Color } from "@/constants/TWPalette";
import MaskedView from "@react-native-masked-view/masked-view";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  cubicBezier,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

const startFactory = (x: number, y: number, rotate: number, scale: number) => ({
  "60%": {
    transform: [{ scale }],
  },
  from: {
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotateZ: `-${rotate}deg` },
      { scale: 0.3 },
    ],
  },
  to: {
    opacity: 1,
    transform: [
      { translateX: x },
      { translateY: y },
      { rotateZ: `${rotate}deg` },
      { scale: 0 },
    ],
  },
});

interface AnimatedTextProps {
  text: string;
}
export function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
    >
      <View>
        <MaskedView
          style={styles.mask}
          maskElement={
            <Animated.Text style={styles.label}>{text}</Animated.Text>
          }
        >
          <Animated.View
            style={[
              styles.gradient,
              {
                animationName: {
                  from: {
                    transform: [{ translateX: "-30%" }],
                  },
                  to: {
                    transform: [{ translateX: "30%" }],
                  },
                },
                animationDuration: "4.5s",
                animationIterationCount: "infinite",
                animationTimingFunction: "ease-in-out",
              } as any,
            ]}
          />
        </MaskedView>
      </View>
      <View style={styles.starWrapper}>
        <Animated.Text
          style={[
            styles.star,
            styles.star1,
            {
              animationDelay: "0.5s",
              animationDuration: "3s",
              animationFillMode: "forwards",
              animationName: startFactory(-10, 12, 15, 1.1),
              animationTimingFunction: cubicBezier(0.42, 0, 0.58, 1),
              animationIterationCount: "infinite",
            } as any,
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          style={[
            styles.star,
            styles.star2,
            {
              animationDelay: "1.2s",
              animationDuration: "3.5s",
              animationFillMode: "forwards",
              animationName: startFactory(15, 10, 20, 0.9),
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            } as any,
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          style={[
            styles.star,
            styles.star3,
            {
              animationDelay: "0.8s",
              animationDuration: "3.2s",
              animationFillMode: "forwards",
              animationName: startFactory(-8, -10, 25, 1.0),
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            } as any,
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          style={[
            styles.star,
            styles.star4,
            {
              animationDelay: "1.5s",
              animationDuration: "3.8s",
              animationFillMode: "forwards",
              animationName: startFactory(12, -8, 18, 0.95),
              animationTimingFunction: cubicBezier(0.42, 0, 0.58, 1),
              animationIterationCount: "infinite",
            } as any,
          ]}
        >
          ✦
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shimmerContainer: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  mask: {
    height: 70,
    width: width * 0.85,
    maxWidth: 450,
  },
  gradient: {
    flex: 1,
    width: "300%",
    marginHorizontal: "-100%",
    [process.env.EXPO_OS === "web"
      ? "backgroundImage"
      : "experimental_backgroundImage"]: `linear-gradient(100deg, ${Color.yellow[800]} 30%, ${Color.yellow[500]} 40%, ${Color.yellow[800]} 50%)`,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  star: {
    color: "#facc15",
    opacity: 0,
    position: "absolute",
  },
  star1: {
    bottom: 70,
    fontSize: 26,
    left: 80,
  },
  star2: {
    fontSize: 22,
    right: 100,
    top: 40,
  },
  star3: {
    fontSize: 20,
    left: 100,
    top: 35,
  },
  star4: {
    fontSize: 26,
    right: 100,
    bottom: 40,
  },
  starWrapper: {
    flexDirection: "row",
    position: "absolute",
  },
});
