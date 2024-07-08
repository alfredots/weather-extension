import { makeAxiosHttpClient } from '../../infra/adapters/HttpClient';
import { getUserList } from '../../infra/gateways/UserGateway';
import { UserList } from './components/UserList';

export const UsersContainer = () => {
  return (
    <>
      <p>UsersContainer</p>
      <UserList loadUserList={getUserList(makeAxiosHttpClient())} />
    </>
  );
};
