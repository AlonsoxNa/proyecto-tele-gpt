import { userSchema } from '@/utils/validations/UserValidation';
import { ChangeEvent, useState } from 'react';

interface ErrorValidation {
  inner: {
    path: string;
    message: string;
  }[];
}

interface FormErrors {
  [ key: string ]: string;
}


export const useForm = <T extends object>( initialState: T ) => {

  const [ errors, setErrors ] = useState<FormErrors>( {} );
  const [ form, setForm ] = useState( initialState );

  const handleChange = ( { target }: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = target;

    setForm( {
      ...form,
      [ name ]: value
    } );
    handleValidate( name );
  };

  const handleValidateAll = async () => {
    try {
      await userSchema.validate( form, { abortEarly: false } );
    } catch ( error: unknown ) {
      const newError: FormErrors = {};

      ( error as ErrorValidation ).inner.forEach( ( err: { path: string; message: string; } ) => {
        newError[ err.path ] = err.message;
      } );
      setErrors( newError );
      return newError;
    }
    setErrors( {} );
    return [];
  };

  const handleValidate = async ( name: string ) => {

    try {
      await userSchema.validate( form, { abortEarly: false } );
      setErrors( {
        ...errors,
        [ name ]: ''
      } );
    } catch ( error ) {
      let newError: string = '';

      ( error as ErrorValidation ).inner.some( ( err: { path: string; message: string; } ) => {
        if ( err.path === name ) {
          newError = err.message;
          return true;
        }
      } );
      setErrors( {
        ...errors,
        [ name ]: newError
      } );
    }
  };

  return {
    form,
    handleChange,
    errors,
    handleValidateAll,
    handleValidate
  };
};