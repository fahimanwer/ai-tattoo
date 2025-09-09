import { Text } from "@/components/ui/Text";
import { Color } from "@/constants/TWPalette";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  type: "photo" | "description";
  // For photo modal
  imageSource?: ImageSourcePropType;
  imageTitle?: string;
  // For description modal
  title?: string;
  description?: string;
}

const { height: screenHeight } = Dimensions.get("window");

export function BottomSheet({
  visible,
  onClose,
  type,
  imageSource,
  imageTitle,
  title,
  description,
}: BottomSheetProps) {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show bottom sheet
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide bottom sheet
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        onClose();
      } else {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <StatusBar style="light" />
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={styles.backdropPressable} onPress={onClose} />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          {/* Handle bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          {type === "photo" && imageSource && (
            <View style={styles.photoContainer}>
              <Image
                source={imageSource}
                style={styles.bottomSheetImage}
                contentFit="cover"
                contentPosition="center"
              />
              {imageTitle && (
                <Text type="xl" weight="bold" style={styles.photoTitle}>
                  {imageTitle}
                </Text>
              )}
            </View>
          )}

          {type === "description" && (
            <View style={styles.descriptionContainer}>
              <ScrollView
                style={styles.descriptionScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.descriptionContent}
              >
                {title && (
                  <Text
                    type="2xl"
                    weight="bold"
                    style={styles.descriptionTitle}
                  >
                    {title}
                  </Text>
                )}
                {description && (
                  <Text
                    type="base"
                    weight="normal"
                    style={styles.descriptionText}
                  >
                    {description}
                  </Text>
                )}
              </ScrollView>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropPressable: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: Color.grayscale[50],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.3,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: "center",
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: Color.grayscale[300],
    borderRadius: 2,
  },

  // Photo bottom sheet styles
  photoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  bottomSheetImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  photoTitle: {
    color: Color.grayscale[900],
    textAlign: "center",
  },

  // Description bottom sheet styles
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  descriptionScroll: {
    flex: 1,
  },
  descriptionContent: {
    paddingBottom: 20,
  },
  descriptionTitle: {
    color: Color.grayscale[900],
    marginBottom: 16,
    textAlign: "center",
  },
  descriptionText: {
    color: Color.grayscale[700],
    lineHeight: 24,
    fontSize: 16,
  },
});
