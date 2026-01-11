import { authClient } from "@/lib/auth-client";
import { Text } from "@/src/components/ui/Text";
import { Color } from "@/src/constants/TWPalette";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { toast } from "sonner-native";
import { customEvent } from "vexo-analytics";

export default function FeatureRequest() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

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

      toast.success("Feature request sent! Thank you for your feedback.", {
        dismissible: true,
        duration: 2000,
      });

      router.back();
    } catch (error) {
      console.error("Error submitting feature request:", error);
      toast.error("Failed to send feature request. Please try again.", {
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
      const subject = "Inkigo AI Feature Request Help";
      const userInfo = user
        ? `User ID: ${user.id}\nEmail: ${user.email}`
        : "(Not signed in)";
      const body = `Hi,\n\nI need help with submitting a feature request.\n\n${userInfo}\n\nDescription:\n[Please describe your issue here]\n\nThanks!`;
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
          title: "Share Your Ideas",
          unstable_headerLeftItems: () => [
            {
              type: "button",
              label: "Cancel",
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
              label: "Send",
              variant: canSubmit ? "prominent" : "plain",
              tintColor: canSubmit ? "yellow" : undefined,
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
            style={styles.input}
            placeholder="Ideas to improve your experience..."
            placeholderTextColor={Color.zinc[500]}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            autoFocus
            editable={!isSubmitting}
          />
          <Text type="xs" style={styles.contactText}>
            Need help?{" "}
            <Text
              type="xs"
              style={styles.contactLink}
              onPress={handleContactSupport}
            >
              Contact us
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
    backgroundColor: Color.zinc[900],
    borderRadius: 16,
    padding: 16,
    color: "white",
    fontSize: 16,
    minHeight: 160,
    borderWidth: 1,
    borderColor: Color.zinc[800],
  },
  contactText: {
    color: Color.zinc[400],
    paddingHorizontal: 4,
  },
  contactLink: {
    color: Color.zinc[400],
    textDecorationLine: "underline",
  },
});
