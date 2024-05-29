import { useUserStore } from '@/stores/user.store';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const token = useUserStore.getState().user.token;

export const getNoticiasAPI = async () => {
  try {
    const response = await axios.get( `${ API_URL }/noticia`, {
      headers: {
        Authorization: `Bearer ${ token }`
      }
    } );

    if ( response.status === 200 ) {
      return response.data;
    }
    return [];
  } catch ( error ) {
    return [];
  }
};