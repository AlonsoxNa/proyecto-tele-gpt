import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  user: {
    name: string;
    email: string;
    token: string;
    isLogged: boolean;
  };
}

interface Actions {
  handleLogin: ( name: string, email: string, token: string ) => void;
  handleLogout: () => void;
}

export const useUserStore = create<State & Actions>()(
  persist(
    ( set ) => ( {
      user: {
        name: '',
        email: '',
        token: '',
        isLogged: false
      },
      handleLogin: ( name: string, email: string, token: string ) => {
        set( { user: { name, email, token, isLogged: true } } );
      },
      handleLogout() {
        set( { user: { name: '', email: '', token: '', isLogged: false } } );
        localStorage.removeItem( 'user-info' );
      },
    } ), {
    name: 'user-info'
  } )
);