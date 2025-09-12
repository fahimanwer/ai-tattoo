import { Asset } from "expo-asset";
import { File } from "expo-file-system/next";

/**
 * Convert a bundled static asset (require("../assets/img.png")) into Base64.
 * This is only needed for static assets, not for images from the gallery.
 */
export async function assetToBase64(moduleId: number): Promise<string> {
  // 1. Resolve the static asset
  const [asset] = await Asset.loadAsync(moduleId);
  const uri = asset.localUri ?? asset.uri;
  if (!uri) throw new Error("Unable to resolve asset URI");

  // 2. Wrap the path with File
  const file = new File(uri);

  // 3. Read as Base64
  const base64 = file.base64(); // synchronous, returns string
  return base64;
}

/**
 * Convert URL image to Base64
 */
export async function urlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Remove data:image/...;base64, prefix
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`Failed to convert URL to base64: ${error}`);
  }
}
