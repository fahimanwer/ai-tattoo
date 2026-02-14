import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function PrivacyPolicyScreen() {
  const { isDark } = useTheme();

  const dynamicStyles = {
    container: {
      backgroundColor: isDark ? "#000000" : "#F5F5F7",
    },
    title: {
      color: isDark ? "#ffffff" : "#000000",
    },
    lastUpdated: {
      color: isDark ? "#cccccc" : "#666666",
    },
    sectionTitle: {
      color: isDark ? "#ffffff" : "#000000",
    },
    paragraph: {
      color: isDark ? "#cccccc" : "#333333",
    },
    bulletPoint: {
      color: isDark ? "#cccccc" : "#333333",
    },
  };

  return (
    <ScrollView
      style={[styles.container, dynamicStyles.container]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <Text style={[styles.title, dynamicStyles.title]}>Privacy Policy</Text>
        <Text style={[styles.lastUpdated, dynamicStyles.lastUpdated]}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>1. Information We Collect</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            When you use Inkigo, we may collect the following information:
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Photos you upload for tattoo preview
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Device information and usage analytics
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Account information if you create an account
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>• Preferences and settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            2. How We Use Your Information
          </Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>We use your information to:</Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Provide AI-powered tattoo preview services
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Improve our app functionality and user experience
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Process and analyze uploaded images for tattoo simulation
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Send important updates about our services
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            3. AI Processing and Third-Party Services
          </Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            Our service uses Google Gemini AI and other third-party AI
            technologies to process your images and create tattoo previews.
            Important information about AI processing:
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Your images may be processed by Google AI services in accordance
            with Google privacy policies
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • AI processing occurs on secure servers with encryption
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • We implement content filtering to prevent processing of prohibited
            content
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • AI processing is subject to the terms and privacy policies of our
            third-party providers
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • We may use anonymized, aggregated data to improve our AI models
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            4. Image Processing and Storage
          </Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            Your uploaded photos are processed using AI technology to create
            realistic tattoo previews. We take your privacy seriously:
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Images are processed securely and encrypted
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • We do not share your personal photos with unauthorized third
            parties
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • You can delete your images at any time
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Images are automatically deleted after 30 days unless saved by you
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • We may retain metadata for security and abuse prevention purposes
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            5. Data Sharing and Disclosure
          </Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties, except:
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • When required by law or legal process
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • To protect our rights, property, or safety
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • With AI service providers (like Google) who process your images
            under strict confidentiality and security agreements
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • With other service providers who help operate our app (under
            strict confidentiality agreements)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>6. Data Security</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            We implement appropriate security measures to protect your
            information:
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • End-to-end encryption for image uploads
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Secure servers with regular security updates
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Access controls and authentication measures
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Regular security audits and monitoring
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Compliance with third-party AI provider security standards
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>7. Your Rights</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>You have the right to:</Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Access your personal information
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Correct or update your information
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Delete your account and associated data
          </Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>• Opt-out of communications</Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>• Request data portability</Text>
          <Text style={[styles.bulletPoint, dynamicStyles.bulletPoint]}>
            • Request information about AI processing of your data
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>8. Cookies and Analytics</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            We use cookies and similar technologies to improve your experience
            and analyze app usage. You can control cookie settings through your
            browser or device settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>9. Children&apos;s Privacy</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            Our service is not intended for children under 13. We do not
            knowingly collect personal information from children under 13. We
            also do not knowingly process images of minors without proper
            parental consent. If you are a parent or guardian and believe your
            child has provided us with personal information, please contact us
            immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>10. International Users</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            If you are accessing our service from outside the United States,
            please be aware that your information may be transferred to, stored,
            and processed in the United States and other countries where our
            servers and AI service providers are located. This includes
            processing by Google AI services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            11. Changes to This Privacy Policy
          </Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            We may update this Privacy Policy from time to time, including
            changes required by our AI service providers or applicable law. We
            will notify you of any changes by posting the new Privacy Policy on
            this page and updating the &quot;Last updated&quot; date.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>12. Contact Us</Text>
          <Text style={[styles.paragraph, dynamicStyles.paragraph]}>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: beto@codewithbeto.dev</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  title: {
    fontSize: width > 768 ? 36 : 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
    marginLeft: 16,
  },
  contactInfo: {
    fontSize: 16,
    color: "#007AFF",
    lineHeight: 24,
    marginBottom: 4,
  },
});
