import * as yup from 'yup';

export const userSchema = yup.object().shape( {
  email: yup.string().matches( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo electrónico no es válido' ).required( 'El correo es obligatorio' ),
  password: yup.string().required( 'La contraseña es obligatoria' ),
} );