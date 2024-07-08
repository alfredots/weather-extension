import { HttpResponse } from '../../infra/models/HttpResponse';
import { User } from '../entities/User';

export type LoadUserList = {
  loadAll: () => Promise<HttpResponse<User[]>>;
};
