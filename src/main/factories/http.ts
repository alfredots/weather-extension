import { HttpClient } from '@/application/protocols';
import { AxiosHttpClient } from '@/infra/http';

export const makeHttpClient = (): HttpClient => new AxiosHttpClient();
