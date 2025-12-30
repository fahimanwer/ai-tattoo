import LinearGradient from "@/src/components/LinearGradient";
import { Color } from "@/src/constants/TWPalette";
import { BlurView } from "expo-blur";
import {
  Image,
  type ImageContentFit,
  type ImageContentPosition,
} from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  useColorScheme,
  View,
  type ColorValue,
  type DimensionValue,
} from "react-native";

export interface VideoOptions {
  loop?: boolean;
  playbackRate?: number;
  muted?: boolean;
  autoPlay?: boolean;
}

export interface LinearGradientImageBlurProps {
  showBlur?: boolean;
  showImage?: boolean;
  showGradient?: boolean;
  gradientColors?: {
    light:
      | readonly [ColorValue, ColorValue, ColorValue]
      | readonly [ColorValue, ColorValue, ColorValue, ColorValue]
      | readonly [ColorValue, ColorValue, ColorValue, ColorValue, ColorValue];
    dark:
      | readonly [ColorValue, ColorValue, ColorValue]
      | readonly [ColorValue, ColorValue, ColorValue, ColorValue]
      | readonly [ColorValue, ColorValue, ColorValue, ColorValue, ColorValue];
  };
  imageUrl?: string;
  videoUrl?: string;
  videoOptions?: VideoOptions;
  blurIntensity?: number;
  solidColor?: string;
  contentFit?: ImageContentFit;
  contentPosition?: ImageContentPosition;
  imageHeight?: DimensionValue;
}

const DEFAULT_VIDEO_OPTIONS: VideoOptions = {
  loop: true,
  playbackRate: 1,
  muted: true,
  autoPlay: true,
};

export default function LinearGradientImageBlur({
  showBlur = true,
  showImage = true,
  showGradient = true,
  gradientColors = {
    light: ["transparent", Color.grayscale[950] + "80", Color.grayscale[950]],
    dark: ["transparent", Color.grayscale[50] + "80", Color.grayscale[50]],
  },
  imageUrl,
  videoUrl,
  videoOptions,
  blurIntensity = 30,
  solidColor,
  contentFit = "cover",
  contentPosition = "top",
  imageHeight = "100%",
}: LinearGradientImageBlurProps) {
  const isDarkMode = useColorScheme() === "dark";

  const selectedColors = isDarkMode
    ? gradientColors.dark
    : gradientColors.light;

  // Merge video options with defaults
  const mergedVideoOptions = { ...DEFAULT_VIDEO_OPTIONS, ...videoOptions };

  // Initialize video player (hooks can't be conditional, so always create it)
  const videoPlayer = useVideoPlayer(videoUrl ?? "", (player) => {
    player.loop = mergedVideoOptions.loop ?? true;
    player.playbackRate = mergedVideoOptions.playbackRate ?? 1;
    player.muted = mergedVideoOptions.muted ?? true;
    if (mergedVideoOptions.autoPlay) {
      player.play();
    }
  });

  // Determine if we should show video (video takes precedence over image)
  const showVideo = !!videoUrl;
  const showImageLayer = !showVideo && (showImage || !!imageUrl);

  return (
    <View style={styles.container}>
      {/* Blur Section*/}
      {showBlur ? (
        <View style={styles.blurView}>
          <BlurView intensity={blurIntensity} style={{ flex: 1 }} />
        </View>
      ) : null}

      {/* Gradient Section*/}
      {showGradient ? (
        <View style={styles.gradientContainer}>
          <LinearGradient colors={selectedColors} />
        </View>
      ) : null}

      {/* Video Section (takes precedence over image) */}
      {showVideo ? (
        <View style={[styles.videoContainer, { height: imageHeight }]}>
          <VideoView
            style={styles.video}
            player={videoPlayer}
            nativeControls={false}
            contentFit="cover"
          />
        </View>
      ) : null}

      {/* Image Section*/}
      {showImageLayer ? (
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          <Image
            style={styles.image}
            contentFit={contentFit}
            contentPosition={contentPosition}
            source={imageUrl}
          />
        </View>
      ) : null}

      {/* Solid Color Section*/}
      {solidColor ? (
        <View
          style={[styles.solidColorContainer, { backgroundColor: solidColor }]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  video: {
    width: "70%",
    height: "70%",
    alignSelf: "center",
    marginTop: 30,
  },
  solidColorContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  gradientContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    flex: 1,
  },
});
