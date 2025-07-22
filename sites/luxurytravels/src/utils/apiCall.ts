import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
 
const BASE_URL = 'http://localhost:3000/api/';
 
export interface ApiCallOptions<T = any> {

  method?: AxiosRequestConfig['method'];

  url: string;

  data?: T;

  params?: Record<string, any>;

  headers?: Record<string, string>;

  withAuth?: boolean;

}
 
function getAuthToken(): string | null {

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {

    return localStorage.getItem('authToken');

  }

  return null;

}
 
export async function apiCall<TResponse = any, TRequest = any>({

  method = 'GET',

  url,

  data,

  params,

  headers = {},

  withAuth = false,

}: ApiCallOptions<TRequest>): Promise<TResponse> {

  const config: AxiosRequestConfig = {

    method,

    url: BASE_URL + url,

    data,

    params,

    headers: {

      ...headers,

    },

  };
 
  if (withAuth) {

    const token = getAuthToken();

    if (token) {

      config.headers!['Authorization'] = `Bearer ${token}`;

    }

  }
 
  try {

    const response: AxiosResponse<TResponse> = await axios.request(config);

    return response.data;

  } catch (error: any) {

    console.error('API Error:', error);

    throw error.response?.data || {

      message: 'An unexpected error occurred.',

      error,

    };

  }

}

 