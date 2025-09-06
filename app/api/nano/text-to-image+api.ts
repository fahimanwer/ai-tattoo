import { constants } from "@/server-utils/constants";
const { GENIMI_IMAGE_BASE_URL } = constants;

export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.log("server", "received prompt", prompt);

  try {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("x-goog-api-key", process.env.GEMINI_API_KEY || "");

    const response = await fetch(GENIMI_IMAGE_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
      headers,
    });

    const data = await response.json();

    // Extract the base64 image data from the response
    // The response has multiple parts: [text, inlineData], so we need to find the inlineData part
    const parts = data?.candidates?.[0]?.content?.parts;
    const imagePart = parts?.find((part: any) => part.inlineData);
    const imageData = imagePart?.inlineData?.data;

    if (!imageData) {
      console.log("server", "No image data found in response");
      return new Response(JSON.stringify({ error: "No image data received" }), {
        status: 500,
      });
    }

    // Return the base64 image data
    console.log(
      "server",
      "Successfully generated image, size:",
      imageData?.length,
      "characters"
    );
    return new Response(JSON.stringify({ imageData }), { status: 200 });
  } catch (error) {
    console.error("server", "text-to-image api error", error);
    return Response.json(
      { success: false, message: "Failed to generate text to image" },
      { status: 500 }
    );
  }
}
