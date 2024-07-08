import { LoadUserList } from '../../domain/use-cases/LoadUserList';
import { HttpClient } from '../adapters/HttpClient';

export const getUserList = (httpClient: HttpClient): LoadUserList => {
  const loadAll: LoadUserList['loadAll'] = async () => {
    return await httpClient.request({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'get'
    });
  };

  return {
    loadAll
  };
};
