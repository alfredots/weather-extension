import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpResponse } from 'infra/models/HttpResponse';

/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpRequest = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  headers?: any;
};

export interface HttpClient {
  request: <R = any>(data: HttpRequest) => Promise<HttpResponse<R>>;
}

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body
      });
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>;
      throw new Error(_error?.response?.data?.message);
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse?.data
    };
  }
}

export const makeAxiosHttpClient = () => new AxiosHttpClientAdapter();
