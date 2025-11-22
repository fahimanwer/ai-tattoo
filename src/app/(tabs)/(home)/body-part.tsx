import BodyPartParallaxView from "@/src/app/components/about/BodyPart";
import { useLocalSearchParams } from "expo-router";
import { ImageSourcePropType } from "react-native";

export default function BodyPart() {
  const { bodyPart, imageUrl, title } = useLocalSearchParams<{
    bodyPart: string;
    imageUrl: string;
    title?: string;
  }>();

  // Default values if params are missing
  const bodyPartValue = bodyPart || "arm";
  const coverImage: ImageSourcePropType = imageUrl
    ? { uri: imageUrl }
    : {
        uri: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/body-parts/arm-male-1.png",
      };

  return (
    <BodyPartParallaxView
      bodyPart={bodyPartValue}
      coverImage={coverImage}
      title={title}
    />
  );
}
