export const NANOBANANA = "gemini-2.5-flash-image";
export const NANOBANANA_PRO = 'gemini-3-pro-image-preview';

export const constants = {
  GEMINI_IMAGE_BASE_URL_NANOBANANA: `https://generativelanguage.googleapis.com/v1beta/models/${NANOBANANA}:generateContent`,
  GEMINI_IMAGE_BASE_URL_NANOBANANA_PRO: `https://generativelanguage.googleapis.com/v1beta/models/${NANOBANANA_PRO}:generateContent`,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  PROMPT_IMPROVE_API_URL: "/api/prompt/improve",
};


