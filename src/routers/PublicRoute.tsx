// PublicRoute Component
import { useUserStore } from '@/stores/user.store';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const PublicRoute: FC<Props> = ({ children }) => {
  const user = useUserStore(state => state.user);

  if (user.isLogged && user.token) {
    return <Navigate to="/admin/noticias" />;
  }

  return <>{children}</>;
};