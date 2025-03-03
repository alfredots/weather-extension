import { AxiosHttpClient } from '@/infra/http';
import { IHttpClient } from '@/infra/http/http-client-contract';

export const makeHttpClient = (): IHttpClient => new AxiosHttpClient();
