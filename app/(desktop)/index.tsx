import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <View style={styles.heroText}>
            <Image
              source={require("../../assets/images/ios-tinted.png")}
              style={styles.appIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>AI Tattoo Try On</Text>
            <Text style={styles.subtitle}>
              Preview virtual tattoos on your body with AI - arm, leg, face &
              more
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Try Now - Its free!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroImage}>
            <Image
              source={require("../../assets/images/model.png")}
              style={styles.modelImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📸</Text>
            <Text style={styles.featureTitle}>Upload Photo</Text>
            <Text style={styles.featureDescription}>
              Take or upload a photo of your arm, leg, or face
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎨</Text>
            <Text style={styles.featureTitle}>Choose Design</Text>
            <Text style={styles.featureDescription}>
              Select from thousands of tattoo designs or upload your own
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureTitle}>AI Preview</Text>
            <Text style={styles.featureDescription}>
              See realistic tattoo preview instantly with AI technology
            </Text>
          </View>
        </View>
      </View>

      {/* SEO Content Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Virtual Tattoo Preview Made Easy
        </Text>
        <Text style={styles.description}>
          Try on tattoos instantly with AI! Upload a photo of your arm, leg, or
          face and see how any tattoo design looks on your skin. Choose from
          thousands of designs or upload your own. AI Tattoo Try On makes tattoo
          preview easy, realistic, and fun.
        </Text>

        <Text style={styles.subsectionTitle}>Perfect for:</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• First-time tattoo seekers</Text>
          <Text style={styles.bulletPoint}>
            • Trying different tattoo placements
          </Text>
          <Text style={styles.bulletPoint}>• Visualizing custom designs</Text>
          <Text style={styles.bulletPoint}>• Comparing tattoo styles</Text>
          <Text style={styles.bulletPoint}>
            • Sharing ideas with tattoo artists
          </Text>
        </View>
      </View>

      {/* Keywords Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose AI Tattoo Try On?</Text>
        <View style={styles.keywordGrid}>
          <View style={styles.keywordCard}>
            <Text style={styles.keywordTitle}>AI Tattoo Technology</Text>
            <Text style={styles.keywordDescription}>
              Advanced artificial intelligence for realistic tattoo simulation
            </Text>
          </View>
          <View style={styles.keywordCard}>
            <Text style={styles.keywordTitle}>Virtual Tattoo Preview</Text>
            <Text style={styles.keywordDescription}>
              See exactly how tattoos will look before getting inked
            </Text>
          </View>
          <View style={styles.keywordCard}>
            <Text style={styles.keywordTitle}>Tattoo App Innovation</Text>
            <Text style={styles.keywordDescription}>
              The most advanced tattoo preview app available
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <Link href="/(web)/privacy-policy" asChild>
            <TouchableOpacity style={styles.footerLink}>
              <Text style={styles.footerLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(web)/terms-of-service" asChild>
            <TouchableOpacity style={styles.footerLink}>
              <Text style={styles.footerLinkText}>Terms of Service</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Text style={styles.footerText}>
          © 2024 AI Tattoo Try On. All rights reserved.
        </Text>
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
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: "#111111",
  },
  heroContent: {
    flexDirection: width > 768 ? "row" : "column",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  heroText: {
    flex: width > 768 ? 1 : undefined,
    alignItems: width > 768 ? "flex-start" : "center",
    paddingRight: width > 768 ? 40 : 0,
    marginBottom: width > 768 ? 0 : 40,
  },
  heroImage: {
    flex: width > 768 ? 1 : undefined,
    alignItems: "center",
    justifyContent: "center",
  },
  appIcon: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  modelImage: {
    width: width > 768 ? 400 : 300,
    height: width > 768 ? 500 : 375,
    maxWidth: "100%",
  },
  title: {
    fontSize: width > 768 ? 48 : 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: width > 768 ? "left" : "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: width > 768 ? 24 : 20,
    color: "#cccccc",
    textAlign: width > 768 ? "left" : "center",
    marginBottom: 32,
    lineHeight: 28,
    maxWidth: 600,
  },
  ctaButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  sectionTitle: {
    fontSize: width > 768 ? 36 : 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: width > 768 ? "row" : "column",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 20,
  },
  featureCard: {
    backgroundColor: "#1a1a1a",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    flex: width > 768 ? 1 : undefined,
    minWidth: width > 768 ? 250 : undefined,
    maxWidth: width > 768 ? 350 : undefined,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#333333",
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#cccccc",
    textAlign: "center",
    lineHeight: 20,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    marginBottom: 4,
  },
  keywordGrid: {
    flexDirection: width > 768 ? "row" : "column",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 20,
  },
  keywordCard: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 8,
    flex: width > 768 ? 1 : undefined,
    minWidth: width > 768 ? 250 : undefined,
    borderWidth: 1,
    borderColor: "#333333",
  },
  keywordTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  keywordDescription: {
    fontSize: 14,
    color: "#cccccc",
    lineHeight: 20,
  },
  footer: {
    backgroundColor: "#111111",
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  footerLinks: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 32,
  },
  footerLink: {
    paddingVertical: 8,
  },
  footerLinkText: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  footerText: {
    fontSize: 14,
    color: "#cccccc",
    textAlign: "center",
  },
});
