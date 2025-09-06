import { Directory, File, Paths } from "expo-file-system/next";
import * as MediaLibrary from "expo-media-library";

export const ALBUM_NAME = "AI Tattoo - Generations";

/** Strip data URL prefix if present */
function stripDataUrlPrefix(b64: string) {
  const i = b64.indexOf("base64,");
  return i !== -1 ? b64.slice(i + "base64,".length) : b64;
}

/** Minimal base64 -> Uint8Array (no external deps) */
function base64ToBytes(b64: string): Uint8Array {
  b64 = stripDataUrlPrefix(b64).replace(/\s/g, "");
  const table =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const len = b64.length;
  // compute output length
  let padding = 0;
  if (len >= 2 && b64[len - 1] === "=") padding++;
  if (len >= 2 && b64[len - 2] === "=") padding++;
  const outLen = (len / 4) * 3 - padding;

  const bytes = new Uint8Array(outLen);
  let byteIdx = 0;

  const sextet = (c: string) => (c === "=" ? 0 : table.indexOf(c));

  for (let i = 0; i < len; i += 4) {
    const c1 = sextet(b64[i]);
    const c2 = sextet(b64[i + 1]);
    const c3 = sextet(b64[i + 2]);
    const c4 = sextet(b64[i + 3]);

    const triple = (c1 << 18) | (c2 << 12) | (c3 << 6) | c4;

    if (byteIdx < outLen) bytes[byteIdx++] = (triple >> 16) & 0xff;
    if (byteIdx < outLen) bytes[byteIdx++] = (triple >> 8) & 0xff;
    if (byteIdx < outLen) bytes[byteIdx++] = triple & 0xff;
  }
  return bytes;
}

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

/** Save a base64 image into Photos (and into the app’s album). */
export async function saveBase64ToAlbum(
  base64: string,
  ext: "png" | "jpg" = "png"
) {
  await ensureWritePermission();

  // 1) Write bytes to a temp file using the NEXT API.
  const dir = new Directory(Paths.cache, "generated");
  if (!dir.exists) dir.create({ intermediates: true });

  const file = new File(dir, `${Date.now()}.${ext}`);
  file.create({ overwrite: true });
  file.write(base64ToBytes(base64)); // IMPORTANT: write bytes, not the base64 string

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
