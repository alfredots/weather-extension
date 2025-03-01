import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpClient, HttpRequest, HttpResponse } from '@/application/protocols';
import { isObject } from '@/main/validators';

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
    } catch (error) {
      const _error = error as AxiosError;
      const backendErrorResponse = _error.response?.data as BackendErrorResponse;

      if (_error.response) {
        let errorResponse = {} as ErrorResponse;

        if (isObject(backendErrorResponse.errors)) {
          const errors = Object.entries(backendErrorResponse.errors).map(([key, value]) => ({ code: key, message: String(value[0]) }) as ErrorDetail);
          errorResponse = {
            errors,
            success: false
          };

          axiosResponse = {
            ..._error.response,
            data: errorResponse
          };
        } else {
          axiosResponse = _error.response;
        }
      } else {
        axiosResponse = {
          status: 400,
          data: {
            errors: [
              {
                code: 'Axios',
                message: _error.message
              } as ErrorDetail
            ],
            success: false
          }
        } as AxiosResponse;
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse?.data
    };
  }
}
