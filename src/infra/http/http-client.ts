import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpRequest, HttpResponse, HttpClient } from '@/infra/http/http-client-contract';

export interface ErrorDetail {
  code: string;
  message: string;
}

export interface ErrorResponse {
  errors: ErrorDetail[];
  success: boolean;
}

export interface BackendErrorResponse {
  errors:
    | { [key: string]: string[] } // Quando os erros são associados a campos específicos
    | ErrorDetail[]; // Quando os erros são gerais (como no segundo objeto)
  type?: string; // Campo opcional, já que o segundo objeto não tem esse campo
  title?: string; // Campo opcional
  status?: number; // Campo opcional
  traceId?: string; // Campo opcional
  success?: boolean; // Campo opcional, presente no segundo objeto
}

export class AxiosHttpClient implements HttpClient {
  async request<R>(data: HttpRequest): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      });
    } catch (er) {
      const error = er as AxiosError;
      const status = error.response?.status || 0;
      const message = error.response?.data || error.message;

      axiosResponse = {
        status,
        data: message,
        statusText: String(error.status),
        headers: error.response!.headers,
        config: error.config!
      };
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse?.data
    };
  }
}
