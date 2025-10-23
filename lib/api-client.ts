import { authClient } from "./auth-client";

export type ApiErrorDetail = { path: string[]; message: string };

export class ApiError extends Error {
  status: number;
  details?: ApiErrorDetail[];
  constructor(status: number, message: string, details?: ApiErrorDetail[]) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

const getBaseURL = () => {
  if (!process.env.EXPO_PUBLIC_BASE_URL) {
    throw new Error("EXPO_PUBLIC_BASE_URL is not set");
  }

  return process.env.EXPO_PUBLIC_BASE_URL;
};

export async function apiFetch<TResponse>(
  path: string,
  { method = "GET", body, headers }: ApiFetchOptions = {}
): Promise<TResponse> {
  const baseUrl = getBaseURL();
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    body: isFormData
      ? (body as any)
      : body !== undefined
      ? JSON.stringify(body)
      : undefined,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Cookie: authClient.getCookie(),
      ...headers,
    },
  });

  const json = await response.json().catch(() => undefined);

  if (!response.ok) {
    const details: ApiErrorDetail[] | undefined = (json as any)?.details;
    if (response.status === 400 && details?.length) {
      const msg = details
        .map((d) => `${d.path.join(".")}: ${d.message}`)
        .join(", ");
      throw new ApiError(400, `Validation Error: ${msg}`, details);
    }
    throw new ApiError(
      response.status,
      (json as any)?.error ||
        `Request failed with ${response.status} ${response.statusText}`
    );
  }

  return json as TResponse;
}
