import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum Status {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export interface RequestConfig extends Omit<AxiosRequestConfig, 'method' | 'data' | 'url' | 'params'> {
  resource: string;
  method?: Methods;
  params?: Record<string, unknown>;
  body?: Record<string, unknown> | unknown;
  signal?: AbortSignal;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

export async function request<T = void>({
  resource,
  method = Methods.GET,
  params,
  body,
  headers,
  signal,
}: RequestConfig): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      url: resource,
      method,
      params,
      data: body,
      headers: {
        ...(headers || {}),
      },
      signal,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 'unknown';
      throw new Error(`Request failed with status ${status}`);
    }

    throw error;
  }
}

export default request;
