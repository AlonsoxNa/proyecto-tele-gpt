import { userSchema } from '@/utils/validations/UserValidation';
import { ChangeEvent, useState } from 'react';

interface ErrorValidation {
  inner: {
    path: string;
    message: string;
  }[];
}

interface FormErrors {
  [key: string]: string;
}

export const useForm = <T extends object>(initialState: T) => {
  
  const [ errors, setErrors ] = useState<FormErrors>({});
  const [form, setForm] = useState(initialState);

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value
    })
  };

  const handleValidate = async () => {
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
    setErrors({});
    return [];
  };

  return {
    form,
    handleChange,
    errors,
    handleValidate
  }
}