// PublicRoute Component
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/stores/user.store';

import { jwtDecode } from 'jwt-decode';

interface Props {
  children: ReactNode;
}

export const PublicRoute: FC<Props> = ({ children }) => {
  const user = useUserStore(state => state.user);

  if (!user.isLogged || !user.token) {
    return <>{children}</>;
  }

  let isValidToken = true;
  const decodedToken = jwtDecode(user.token);

  if ( decodedToken.exp! * 1000 < Date.now() ) {
    isValidToken = false;
  }

  if ( isValidToken ) {
    return <Navigate to="/admin/noticias" />;
  }
  
  return <>{children}</>;
};