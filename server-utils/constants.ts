const MODEL_ID = "gemini-3-pro-image-preview";
export const constants = {
  GENIMI_IMAGE_BASE_URL: `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent`,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};

console.log("Using model:", MODEL_ID);
