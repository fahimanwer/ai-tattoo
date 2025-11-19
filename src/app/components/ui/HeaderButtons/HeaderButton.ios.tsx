import { theme } from "@/src/theme/theme";
import {
  Button,
  ButtonProps,
  Host,
  Image,
  ImageProps,
} from "@expo/ui/swift-ui";
import { padding } from "@expo/ui/swift-ui/modifiers";
import { StyleProp, ViewStyle } from "react-native";

const SIZE = theme.fontSize20;

export interface HeaderButtonProps {
  imageProps?: ImageProps;
  buttonProps?: ButtonProps;
  style?: StyleProp<ViewStyle>;
}

export function HeaderButton({
  imageProps,
  buttonProps,
  style,
}: HeaderButtonProps) {
  return (
    <Host matchContents style={[{ height: SIZE, width: SIZE }, style]}>
      <Button
        {...buttonProps}
        variant={buttonProps?.variant || "glass"}
        controlSize="small"
      >
        <Image
          {...imageProps}
          systemName={imageProps?.systemName || "xmark"}
          color={imageProps?.color || "primary"}
          size={imageProps?.size || SIZE}
          modifiers={[
            padding({ vertical: 5 }),
            // frame({ height: SIZE, width: SIZE }),
            ...(imageProps?.modifiers || []),
          ]}
        />
      </Button>
    </Host>
  );
}
