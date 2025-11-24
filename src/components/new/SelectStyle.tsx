import { featuredTattoos } from "@/lib/featured-tattoos";
import { ItemStyle } from "@/src/components/new/ItemStyle";
import { Icon } from "@/src/components/ui/Icon";
import { Text } from "@/src/components/ui/Text";
import { useTattooCreation } from "@/src/context/TattooCreationContext";
import { GlassView } from "expo-glass-effect";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

export function SelectStyle() {
  const { options, setOption } = useTattooCreation();
  const [showSecondGlass, setShowSecondGlass] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const selectedStyleName = options.selectedTattoo?.title || "Select Style";

  useEffect(() => {
    if (showSecondGlass) {
      // Reset to 0 first, then animate to 1
      setIsAnimating(true);
      bounceAnim.setValue(0);
      Animated.spring(bounceAnim, {
        toValue: 1,
        tension: 200,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else if (isAnimating) {
      // Animate out with timing for better visibility
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Only hide the component after animation completes
        setIsAnimating(false);
      });
    }
  }, [showSecondGlass, bounceAnim, isAnimating]);

  return (
    <>
      <View
        style={{
          width: "100%",
          height: 44,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/*  <Button
          onPress={() => {}}
          title={selectedStyleName}
          style={{ width: 250, height: "100%" }}
        /> */}
        <GlassView isInteractive style={styles.glassView}>
          <Pressable
            onPress={() => setShowSecondGlass(!showSecondGlass)}
            style={styles.actionButton}
          >
            <Text weight="medium" lightColor="white" darkColor="white">
              {selectedStyleName}
            </Text>

            <Icon
              symbol={"chevron.up.chevron.down"}
              style={styles.chevronIcon}
              color={"white"}
            />
          </Pressable>
        </GlassView>
      </View>

      {showSecondGlass && (
        <Pressable
          onPress={() => setShowSecondGlass(false)}
          style={styles.backdrop}
        />
      )}

      {(showSecondGlass || isAnimating) && (
        <Animated.View
          style={[
            styles.secondGlassViewContainer,
            {
              transform: [
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1],
                  }),
                },
                {
                  translateY: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
              opacity: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <GlassView isInteractive style={styles.glassViewInner}>
            {/* Display featured tattoos individually */}
            {featuredTattoos.map((tattoo) => (
              <ItemStyle
                key={tattoo.id}
                tattoo={tattoo}
                isSelected={options.selectedTattoo?.id === tattoo.id}
                onPress={() => {
                  setOption("selectedTattoo", tattoo);
                  setShowSecondGlass(false);
                }}
              />
            ))}
          </GlassView>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  glassView: {
    width: "auto",
    height: "100%",
    borderRadius: 99,
    overflow: "hidden",
  },
  actionButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "100%",
    borderRadius: 99,
    paddingHorizontal: 12,
    gap: 6,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9,
  },
  secondGlassViewContainer: {
    position: "absolute",
    width: 280,
    height: 180,
    top: -14,
    alignSelf: "center",
    zIndex: 10,
  },
  glassViewInner: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  chevronIcon: {
    width: 16,
    height: 16,
  },
});
