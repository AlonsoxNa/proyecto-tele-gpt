import { useUserStore } from '@/stores/user.store';
import { jwtDecode } from 'jwt-decode';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const PrivateRoute: FC<Props> = ( { children } ) => {

  const user = useUserStore( state => state.user );

  if ( !user.isLogged || !user.token ) {
    return <Navigate to="/login" />;
  }

  let isValidToken = false;
  const decodedToken = jwtDecode( user.token );

  if ( decodedToken.exp! * 1000 >= Date.now() ) {
    isValidToken = true;
  }

  if ( !isValidToken ) {
    return <Navigate to="/login" />;
  }

  return ( <>{ children }</> );
};