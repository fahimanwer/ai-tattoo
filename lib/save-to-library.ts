import { Directory, File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { base64ToBytes } from "./base64-utils";

export const ALBUM_NAME = "AI Tattoo - Generations";

async function ensureWritePermission() {
  const p = await MediaLibrary.getPermissionsAsync();
  if (!p.granted) {
    const r = await MediaLibrary.requestPermissionsAsync();
    if (!r.granted) throw new Error("Photos permission denied.");
  }
}

async function getOrCreateAlbumWith(asset: MediaLibrary.Asset) {
  let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
  if (!album) {
    // Android: copy=true so item also appears in “Recents”
    album = await MediaLibrary.createAlbumAsync(
      ALBUM_NAME,
      asset,
      /* copy */ true
    );
  } else {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, /* copy */ false);
  }
  return album;
}

/** Save a base64 image into Photos (and into the app's album). */
export async function saveBase64ToAlbum(
  base64: string,
  ext: "png" | "jpg" = "png"
) {
  await ensureWritePermission();

  // 1) Write bytes to a temp file using FileSystem API.
  const cacheDir = new Directory(Paths.cache, "generated");
  if (!cacheDir.exists) {
    cacheDir.create();
  }

  const fileName = `${Date.now()}.${ext}`;
  const file = new File(cacheDir, fileName);

  // Convert base64 to bytes and write to file
  const bytes = base64ToBytes(base64);
  file.write(bytes);

  // 2) Create a MediaLibrary asset for that file.
  const asset = await MediaLibrary.createAssetAsync(file.uri);

  // 3) Ensure album exists and add the asset.
  const album = await getOrCreateAlbumWith(asset);

  return { assetId: asset.id, albumId: album.id, uri: asset.uri };
}

/** List assets from the album (for in-app gallery). */
export async function listAlbumAssets(limit = 100) {
  const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
  if (!album) return [];
  const { assets } = await MediaLibrary.getAssetsAsync({
    album,
    sortBy: [MediaLibrary.SortBy.creationTime],
    mediaType: ["photo"],
    first: limit,
  });
  return assets;
}
