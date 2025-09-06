import { apiFetch } from "./api-client";

export function createJsonMutation<TInput, TOutput>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  mapInputToBody: (input: TInput) => unknown = (x) => x
) {
  return async (input: TInput): Promise<TOutput> => {
    return apiFetch<TOutput>(path, { method, body: mapInputToBody(input) });
  };
}
