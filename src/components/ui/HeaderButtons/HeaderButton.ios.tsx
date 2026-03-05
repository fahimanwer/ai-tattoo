import { theme } from "@/src/theme/theme";
import {
  Button,
  ButtonProps,
  Host,
  Image,
  ImageProps,
} from "@expo/ui/swift-ui";
import { buttonStyle, controlSize, padding } from "@expo/ui/swift-ui/modifiers";
import { StyleProp, ViewStyle } from "react-native";

const SIZE = theme.fontSize20;

type ButtonStyleVariant = "automatic" | "bordered" | "borderedProminent" | "borderless" | "glass" | "glassProminent" | "plain";

export interface HeaderButtonProps {
  imageProps?: ImageProps;
  buttonProps?: ButtonProps & { variant?: ButtonStyleVariant };
  style?: StyleProp<ViewStyle>;
}

export function HeaderButton({
  imageProps,
  buttonProps,
  style,
}: HeaderButtonProps) {
  const { variant, ...restButtonProps } = buttonProps ?? {};
  return (
    <Host matchContents style={[{ height: SIZE, width: SIZE }, style]}>
      <Button
        {...restButtonProps}
        modifiers={[
          controlSize("small"),
          buttonStyle(variant || "borderedProminent"),
        ]}
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
