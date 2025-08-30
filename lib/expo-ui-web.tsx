import React from "react";
import {
  Platform,
  Switch as RNSwitch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Web-compatible fallback components for @expo/ui
const WebButton = (props: any) => {
  const { onPress, children, systemImage, role, ...restProps } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 8,
        backgroundColor: role === "destructive" ? "#FF3B30" : "#007AFF",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
      {...restProps}
    >
      {typeof children === "string" ? (
        <Text style={{ color: "white" }}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const WebHost = (props: any) => {
  return <View {...props} />;
};

const WebImage = (props: any) => {
  const { systemName, onPress, ...restProps } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
      }}
      {...restProps}
    >
      <Text style={{ fontSize: 12 }}>{systemName || "●"}</Text>
    </TouchableOpacity>
  );
};

const WebSwitch = (props: any) => {
  const { onValueChange, value, label, variant, ...restProps } = props;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {label && <Text style={{ marginRight: 8 }}>{label}</Text>}
      <RNSwitch value={value} onValueChange={onValueChange} {...restProps} />
    </View>
  );
};

const WebContextMenu = (props: any) => {
  return <View {...props} />;
};

const WebContextMenuTrigger = (props: any) => {
  return <TouchableOpacity {...props} />;
};

const WebContextMenuItems = (props: any) => {
  return <></>;
};

const WebSubmenu = (props: any) => {
  const { button, children } = props;
  return (
    <View>
      {button}
      {children}
    </View>
  );
};

// Platform-specific exports
let NativeComponents: any = {};

if (Platform.OS !== "web") {
  // Import native components only on native platforms
  NativeComponents = require("@expo/ui/swift-ui");
}

// Export the appropriate components based on platform
export const Button =
  Platform.OS === "web" ? WebButton : NativeComponents.Button;
export const Host = Platform.OS === "web" ? WebHost : NativeComponents.Host;
export const Image = Platform.OS === "web" ? WebImage : NativeComponents.Image;
export const Switch =
  Platform.OS === "web" ? WebSwitch : NativeComponents.Switch;
export const Submenu =
  Platform.OS === "web" ? WebSubmenu : NativeComponents.Submenu;

// ContextMenu with sub-components
const ContextMenuComponent =
  Platform.OS === "web" ? WebContextMenu : NativeComponents.ContextMenu;
if (Platform.OS === "web") {
  (ContextMenuComponent as any).Trigger = WebContextMenuTrigger;
  (ContextMenuComponent as any).Items = WebContextMenuItems;
}

export const ContextMenu = ContextMenuComponent;
