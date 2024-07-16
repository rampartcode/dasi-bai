import type { FetchError } from "ofetch";
import type { _AsyncData } from "~/types/asyncData";

export async function useMyFetch<T>(
  endpoint: string,
  options: IOptions
): Promise<_AsyncData<T, FetchError>> {
  const { headers, method, body, contentType } = options;

  const config = useRuntimeConfig();

  const token = authCookie.getToken();
  const baseURL = config.public.apiBaseUrl;

  const header = new Headers({
    ...headers,
    authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    "x-apikey": config.public.apiSecretToken,
  });

  let requestBody: any;

  if (contentType === "json" && body) {
    header.append("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  } else if (contentType === "form-data" && body) {
    requestBody = body;
  }

  const { data, error, status, execute, pending, refresh } = await useFetch<T>(
    `${baseURL}/${endpoint}`,
    {
      method,
      headers: header,
      body: requestBody,
    }
  );

  return { data, status, error, execute, pending, refresh };
}

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type DataType = "json" | "form-data";

interface IOptions {
  method: HttpMethods;
  body?: object;
  contentType?: DataType;
  headers?: object;
}
