import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().email('El formato del correo electrónico es inválido').required('El correo es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});