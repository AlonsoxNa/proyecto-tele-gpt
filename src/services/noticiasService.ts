import { useUserStore } from '@/stores/user.store';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_ENDPOINT;
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

// TODO: Implementar llamada a la API para borrar noticia
export const borrarNoticiaAPI = async ( id: string ) => {
  try {
    const response = await axios.delete( `${ API_URL }/noticia?id=${id}` );
    if (response.status ==202){
      return {success:true,message:'Eliminada correctamente'}
    }
    return  {success:false};
  } catch ( error:any ) {
    let message=''
    if (error.status == 404){
      message='No existe noticia con ese id'
    }else if(error.status == 400){
      message='Error por body'
    }else if (error.status == 409){
      message='Ocurrió un error al eliminar'
    }
    return {success:false,message:message};
  }
};