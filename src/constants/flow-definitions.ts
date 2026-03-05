/**
 * Flow definitions for the Playground creative suite.
 * Each definition describes a flow card shown in the Flow Picker and Home grid.
 */

import type { FlowType } from "@/src/context/playground/flow-types";
import { CDN_BASE_URL } from "@/src/constants/cdn";
import { Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";

export interface FlowDefinition {
  type: FlowType;
  /** i18n key for the flow title (under flows namespace) */
  titleKey: string;
  /** i18n key for the flow description */
  descriptionKey: string;
  /** SF Symbol name (iOS) / Ionicons name (Android) */
  iconSF: string;
  iconIon: keyof typeof Ionicons.glyphMap;
  /** Route path within (playground) group */
  route: Href;
  /** Gradient colors for the card background */
  gradient: [string, string];
  /** Whether this flow costs credits */
  costsCredits: boolean;
  /** CDN image for the card background */
  image: { uri: string };
}

export const FLOW_DEFINITIONS: FlowDefinition[] = [
  {
    type: "generate",
    titleKey: "flows.generate.title",
    descriptionKey: "flows.generate.description",
    iconSF: "wand.and.sparkles",
    iconIon: "sparkles",
    route: "/(playground)/generate",
    gradient: ["#3563E9", "#1D4ED8"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/1-generate.avif` },
  },
  {
    type: "tryOn",
    titleKey: "flows.tryOn.title",
    descriptionKey: "flows.tryOn.description",
    iconSF: "person.crop.rectangle.badge.plus",
    iconIon: "body-outline",
    route: "/(playground)/try-on",
    gradient: ["#8B5CF6", "#6D28D9"],
    costsCredits: false,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/2-try-on.avif` },
  },
  {
    type: "aiPortrait",
    titleKey: "flows.aiPortrait.title",
    descriptionKey: "flows.aiPortrait.description",
    iconSF: "person.fill.viewfinder",
    iconIon: "person-outline",
    route: "/(playground)/ai-portrait",
    gradient: ["#EC4899", "#BE185D"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/5-ai-portrait.avif` },
  },
  {
    type: "petPortrait",
    titleKey: "flows.petPortrait.title",
    descriptionKey: "flows.petPortrait.description",
    iconSF: "pawprint.fill",
    iconIon: "paw-outline",
    route: "/(playground)/pet-portrait",
    gradient: ["#F59E0B", "#D97706"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/6-pet-portrait.avif` },
  },
  {
    type: "combine",
    titleKey: "flows.combine.title",
    descriptionKey: "flows.combine.description",
    iconSF: "square.on.square.intersection.dashed",
    iconIon: "git-merge-outline",
    route: "/(playground)/combine",
    gradient: ["#10B981", "#059669"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/3-combine.avif` },
  },
  {
    type: "selectAndEdit",
    titleKey: "flows.selectAndEdit.title",
    descriptionKey: "flows.selectAndEdit.description",
    iconSF: "pencil.and.outline",
    iconIon: "brush-outline",
    route: "/(playground)/select-and-edit",
    gradient: ["#6366F1", "#4338CA"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/7-select-edit.avif` },
  },
  {
    type: "upscale",
    titleKey: "flows.upscale.title",
    descriptionKey: "flows.upscale.description",
    iconSF: "arrow.up.left.and.arrow.down.right",
    iconIon: "expand-outline",
    route: "/(playground)/upscale",
    gradient: ["#14B8A6", "#0D9488"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/8-upscale.avif` },
  },
  {
    type: "erase",
    titleKey: "flows.erase.title",
    descriptionKey: "flows.erase.description",
    iconSF: "eraser.fill",
    iconIon: "close-circle-outline",
    route: "/(playground)/erase",
    gradient: ["#EF4444", "#DC2626"],
    costsCredits: true,
    image: { uri: `${CDN_BASE_URL}/ai-tattoo/demos/4-erase.avif` },
  },
];
