import { authClient } from "@/lib/auth-client";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { useTheme } from "@/src/context/ThemeContext";
import { useThemeColor } from "heroui-native";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import { customEvent } from "vexo-analytics";

export default function FeatureRequest() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const fg = useThemeColor("foreground");
  const muted = useThemeColor("muted");

  function handleDismiss() {
    router.back();
  }

  async function handleSubmit() {
    if (!message.trim()) {
      return;
    }

    setIsSubmitting(true);
    customEvent("feature_request_submitted", {
      messageLength: message.length,
    });

    try {
      const response = await fetch("/api/feature-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          userId: user?.id,
          userEmail: user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feature request");
      }

      toast.success(t('featureRequest.successToast'), {
        dismissible: true,
        duration: 2000,
      });

      router.back();
    } catch (error) {
      console.error("Error submitting feature request:", error);
      toast.error(t('featureRequest.errorToast'), {
        dismissible: true,
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const canSubmit = message.trim().length > 0 && !isSubmitting;

  const handleContactSupport = async () => {
    try {
      const subject = t('emails.featureRequest.subject');
      const userInfo = user
        ? `User ID: ${user.id}\nEmail: ${user.email}`
        : t('auth.notSignedIn');
      const body = t('emails.featureRequest.body', { userInfo });
      const mailtoUrl = `mailto:beto@codewithbeto.dev?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      await Linking.openURL(mailtoUrl);
    } catch (error) {
      console.error("Error opening email:", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('featureRequest.title'),
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: t('common.cancel'),
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              onPress: handleDismiss,
            },
          ],
          unstable_headerRightItems: () => [
            {
              type: "button",
              label: t('common.send'),
              variant: canSubmit ? "prominent" : "plain",
              tintColor: canSubmit ? "#3563E9" : undefined,
              disabled: !canSubmit,
              onPress: handleSubmit,
            },
          ],
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? Color.zinc[900] : Color.zinc[50],
                color: fg,
                borderColor: isDark ? Color.zinc[800] : Color.zinc[200],
              },
            ]}
            placeholder={t('featureRequest.placeholder')}
            placeholderTextColor={muted}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            autoFocus
            editable={!isSubmitting}
          />
          <Text type="xs" style={[styles.contactText, { color: muted }]}>
            {t('featureRequest.needHelp')}{" "}
            <Text
              type="xs"
              style={[styles.contactLink, { color: muted }]}
              onPress={handleContactSupport}
            >
              {t('featureRequest.contactUs')}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 24,
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    minHeight: 160,
    borderWidth: 1,
  },
  contactText: {
    paddingHorizontal: 4,
  },
  contactLink: {
    textDecorationLine: "underline",
  },
});
