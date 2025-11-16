import { Directory, File, Paths } from "expo-file-system";
import { base64ToBytes } from "./base64-utils";

/**
 * Image cache utility for storing generated images to disk
 * instead of keeping large base64 strings in memory
 */

// Create a dedicated cache directory for session images
const SESSION_CACHE_DIR = "playground-session";

/**
 * Ensure the cache directory exists
 */
function ensureCacheDirectory(): Directory {
  const cacheDir = new Directory(Paths.cache, SESSION_CACHE_DIR);
  if (!cacheDir.exists) {
    cacheDir.create();
  }
  return cacheDir;
}

/**
 * Save a base64 image to the file system and return the file URI
 * This significantly reduces memory usage by storing images on disk
 * instead of keeping large base64 strings in React state
 */
export async function cacheBase64Image(
  base64: string,
  ext: "png" | "jpg" = "png"
): Promise<string> {
  const cacheDir = ensureCacheDirectory();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${ext}`;
  const file = new File(cacheDir, fileName);

  // Convert base64 to bytes and write to file
  const bytes = base64ToBytes(base64);
  file.write(bytes);

  return file.uri;
}

/**
 * Read a cached image as base64 (useful for sharing/saving operations)
 * This allows us to store file URIs in state but still access base64 when needed
 */
export async function getCachedImageAsBase64(fileUri: string): Promise<string> {
  const file = new File(fileUri);
  const base64 = await file.base64();
  return `data:image/png;base64,${base64}`;
}

/**
 * Delete a cached image file
 */
export async function deleteCachedImage(fileUri: string): Promise<void> {
  try {
    const file = new File(fileUri);
    if (file.exists) {
      file.delete();
    }
  } catch (error) {
    console.error("Error deleting cached image:", error);
  }
}

/**
 * Clear all cached images from the session directory
 * Call this when resetting the playground session
 */
export async function clearSessionCache(): Promise<void> {
  try {
    const cacheDir = new Directory(Paths.cache, SESSION_CACHE_DIR);
    if (cacheDir.exists) {
      cacheDir.delete();
    }
  } catch (error) {
    console.error("Error clearing session cache:", error);
  }
}
