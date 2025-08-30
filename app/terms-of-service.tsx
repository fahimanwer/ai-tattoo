import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function TermsOfServiceScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing and using AI Tattoo Try On (&quot;the Service&quot;),
            you accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to abide by the above, please do not
            use this service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.paragraph}>
            AI Tattoo Try On is a virtual tattoo preview application that uses
            artificial intelligence to simulate how tattoo designs would appear
            on your body. The service includes:
          </Text>
          <Text style={styles.bulletPoint}>
            • AI-powered tattoo simulation technology
          </Text>
          <Text style={styles.bulletPoint}>
            • Virtual tattoo preview on uploaded photos
          </Text>
          <Text style={styles.bulletPoint}>
            • Access to tattoo design library
          </Text>
          <Text style={styles.bulletPoint}>
            • Custom design upload functionality
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            When using our service, you agree to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide accurate information when creating an account
          </Text>
          <Text style={styles.bulletPoint}>
            • Use the service only for lawful purposes
          </Text>
          <Text style={styles.bulletPoint}>
            • Not upload inappropriate, offensive, or copyrighted content
          </Text>
          <Text style={styles.bulletPoint}>
            • Respect intellectual property rights
          </Text>
          <Text style={styles.bulletPoint}>
            • Not attempt to reverse engineer or hack the service
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4. Content and Intellectual Property
          </Text>
          <Text style={styles.paragraph}>
            Regarding content and intellectual property:
          </Text>
          <Text style={styles.bulletPoint}>
            • You retain ownership of photos you upload
          </Text>
          <Text style={styles.bulletPoint}>
            • You grant us permission to process your images for tattoo
            simulation
          </Text>
          <Text style={styles.bulletPoint}>
            • Our tattoo designs and AI technology are protected by copyright
          </Text>
          <Text style={styles.bulletPoint}>
            • You may not redistribute or resell our content
          </Text>
          <Text style={styles.bulletPoint}>
            • Generated previews are for personal use only
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. Privacy and Data Protection
          </Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. Our collection and use of personal
            information is governed by our Privacy Policy. By using the service,
            you consent to the collection and use of information as outlined in
            our Privacy Policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Disclaimer of Warranties</Text>
          <Text style={styles.paragraph}>
            The service is provided &quot;as is&quot; without warranties of any
            kind:
          </Text>
          <Text style={styles.bulletPoint}>
            • We do not guarantee the accuracy of tattoo previews
          </Text>
          <Text style={styles.bulletPoint}>
            • Actual tattoo results may vary significantly from previews
          </Text>
          <Text style={styles.bulletPoint}>
            • The service may have technical limitations or interruptions
          </Text>
          <Text style={styles.bulletPoint}>
            • We recommend consulting with professional tattoo artists
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            To the fullest extent permitted by law:
          </Text>
          <Text style={styles.bulletPoint}>
            • We are not liable for any indirect, incidental, or consequential
            damages
          </Text>
          <Text style={styles.bulletPoint}>
            • Our total liability shall not exceed the amount paid for the
            service
          </Text>
          <Text style={styles.bulletPoint}>
            • We are not responsible for tattoo decisions based on our previews
          </Text>
          <Text style={styles.bulletPoint}>
            • Users assume full responsibility for their tattoo choices
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            8. Medical and Safety Disclaimer
          </Text>
          <Text style={styles.paragraph}>
            Important medical and safety information:
          </Text>
          <Text style={styles.bulletPoint}>
            • Our service is for visualization purposes only
          </Text>
          <Text style={styles.bulletPoint}>
            • Always consult with licensed tattoo professionals
          </Text>
          <Text style={styles.bulletPoint}>
            • Consider skin type, allergies, and medical conditions
          </Text>
          <Text style={styles.bulletPoint}>
            • We are not medical professionals and provide no medical advice
          </Text>
          <Text style={styles.bulletPoint}>
            • Tattoos are permanent and carry inherent risks
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Prohibited Uses</Text>
          <Text style={styles.paragraph}>You may not use the service for:</Text>
          <Text style={styles.bulletPoint}>
            • Any unlawful purpose or activity
          </Text>
          <Text style={styles.bulletPoint}>
            • Uploading inappropriate or offensive images
          </Text>
          <Text style={styles.bulletPoint}>
            • Violating any intellectual property rights
          </Text>
          <Text style={styles.bulletPoint}>
            • Attempting to harm or exploit minors
          </Text>
          <Text style={styles.bulletPoint}>
            • Transmitting viruses or malicious code
          </Text>
          <Text style={styles.bulletPoint}>
            • Commercial use without authorization
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Account Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate or suspend accounts that violate
            these terms. You may also terminate your account at any time by
            contacting us or using the account deletion feature in the app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Age Restrictions</Text>
          <Text style={styles.paragraph}>
            Users must be at least 13 years old to use this service. Users under
            18 should have parental supervision and consent before making any
            tattoo-related decisions. Always check local laws regarding tattoo
            age restrictions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time. Users will
            be notified of significant changes, and continued use of the service
            constitutes acceptance of modified terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Governing Law</Text>
          <Text style={styles.paragraph}>
            These terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Contact Information</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms of Service, please
            contact us at:
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
    backgroundColor: "#000000",
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
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#cccccc",
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
    color: "#ffffff",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#cccccc",
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
