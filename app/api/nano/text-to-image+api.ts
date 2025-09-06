import { constants } from "@/server-utils/constants";
const { GENIMI_IMAGE_BASE_URL } = constants;

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const response = await fetch(GENIMI_IMAGE_BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
  });

  const data = await response.json();

  // Extract the base64 image data from the response
  const imageData =
    data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!imageData) {
    return new Response(JSON.stringify({ error: "No image data received" }), {
      status: 500,
    });
  }

  // Return the base64 image data
  return new Response(JSON.stringify({ imageData }), { status: 200 });
}
