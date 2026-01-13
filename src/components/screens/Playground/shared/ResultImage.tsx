import { BLURHASH } from "@/lib/image-cache";
import { Icon } from "@/src/components/ui/Icon";
import { Color } from "@/src/constants/TWPalette";
import { Image } from "expo-image";
import { PressableScale } from "pressto";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

export interface ResultImageProps {
  uri: string;
  onPress: () => void;
  isSingleImage: boolean;
  onRemove?: () => void;
}

export function ResultImage({
  uri,
  onPress,
  isSingleImage,
  onRemove,
}: ResultImageProps) {
  return (
    <View style={{ position: "relative", width: "100%", height: "100%" }}>
      <PressableScale onPress={onPress} animationType="timing">
        <Image
          source={{ uri }}
          placeholder={{ blurhash: BLURHASH }}
          cachePolicy="memory-disk"
          style={{
            width: "100%",
            height: isSingleImage ? 400 : 200,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: Color.gray[500] + "30",
          }}
          contentFit="cover"
          contentPosition="center"
          transition={350}
        />
      </PressableScale>
      {onRemove && (
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <Icon symbol="xmark" size="xs" color="white" />
        </Pressable>
      )}
    </View>
  );
}
