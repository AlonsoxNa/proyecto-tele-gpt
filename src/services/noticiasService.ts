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

export const cambiarEstadoNoticiaAPI = async ( id: string, estado: boolean ) => {
  try {
    const response = await axios.patch( `${ API_URL }/noticia/cambiar-estado?id=${ id }`, {
      estado
    } );

    return response;
  } catch ( error ) {
    return error;
  }
};

export const cambiarEstadoNoticiasAPI = async ( ids: string[], estado: boolean ) => {
  try {
    const response = await axios.patch( `${ API_URL }/noticia/cambiar-estado-list`, {
      array: ids,
      estado
    } );

    return response;
  } catch ( error ) {
    return error;
  }
};