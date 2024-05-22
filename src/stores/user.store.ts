import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  user: {
    email: string;
    token: string;
    isLogged: boolean;
  }
}

interface Actions {
  handleLogin: (email: string, token: string) => void;
  handleLogout: () => void;
}

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: {
        email: '',
        token: '',
        isLogged: false 
      },
      handleLogin: (email: string, token: string) => {
        set({ user: { email, token, isLogged: true } });
      },
      handleLogout() {
        set({ user: { email: '', token: '', isLogged: false } });
        localStorage.removeItem('user-storage');
      },
    }), {
    name: 'user-storage'
  })
);