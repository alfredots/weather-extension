import { UserListProps } from './types';
import { useUserList } from './useUserList';

export const UserList = ({ loadUserList }: UserListProps) => {
  const { users } = useUserList({ loadUserList });

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
};
