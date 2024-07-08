import { useCallback, useEffect, useState } from 'react';
import { User } from '../../../../domain/entities/User';
import { UserListProps } from './types';

export const useUserList = ({ loadUserList }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(async () => {
    const response = await loadUserList.loadAll();

    setUsers(response.body || []);
  }, [loadUserList]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    users
  };
};
