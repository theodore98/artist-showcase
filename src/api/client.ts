import { env } from '../config/env';

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

interface LastFmParams {
  method: string;
  [key: string]: string | number | undefined;
}

export class ApiError extends Error {
  statusCode?: number;
  response?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

export async function lastFmGet<T>(params: LastFmParams): Promise<T> {
  const url = new URL(BASE_URL);
  
  // Add default params
  url.searchParams.append('api_key', env.lastFmApiKey);
  url.searchParams.append('format', 'json');

  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();

    // Check for Last.fm API errors
    if (data.error) {
      throw new ApiError(`Last.fm API Error: ${data.message}`, data.error);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(`Network error: ${error.message}`);
    }

    throw new ApiError('Unknown error occurred');
  }
}

