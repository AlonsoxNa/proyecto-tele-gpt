import axios from 'axios';
const API_URL = import.meta.env.VITE_BASE_URL;

export const login = async ( email: string, contrasena: string ) => {
  try {
    const response = await axios.post( `${ API_URL }/identidad/login`, {
      email,
      contrasena
    } );

    return response;
  } catch ( error ) {
    return error;
  }
};