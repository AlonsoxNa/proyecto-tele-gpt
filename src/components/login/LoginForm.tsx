import { useForm } from '@/hooks/useForm';
import { useUserStore } from '@/stores/user.store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {

  const navigate = useNavigate();

  const { form, errors, handleChange, handleValidate } = useForm<FormData>( {
    email: '',
    password: ''
  } );

  const [ showPassword, setShowPassword ] = useState( false );

  const handleClickShowPassword = () => setShowPassword( ( show ) => !show );

  const { handleLogin } = useUserStore();

  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const errors = await handleValidate();
    if ( errors.length === 0 ) {
      handleLogin( form.email, form.password );
      navigate( '/home' );
    }

  };

  return (
    <Grid item xs={ 12 } >

      <form action="" onSubmit={ handleSubmit } autoComplete="off">

        <Grid container direction="column" gap={ 3 } >

          <Grid item>
            <TextField
              error={ !!errors.email }
              id="email"
              name="email"
              type="email"
              label="Correo electrónico"
              value={ form.email }
              onChange={ handleChange }
              helperText={ errors.email }
              onBlur={ handleValidate }
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              error={ !!errors.password }
              helperText={ errors.password }
              id="password"
              name="password"
              type={ showPassword ? 'text' : 'password' }
              InputProps={ {
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ handleClickShowPassword }
                    edge="end"
                  >
                    { showPassword ? <VisibilityOff /> : <Visibility /> }
                  </IconButton>
                </InputAdornment>
              } }
              label="Contraseña"
              value={ form.password }
              onChange={ handleChange }
              onBlur={ handleValidate }
              fullWidth
            />
          </Grid>
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              sx={ { width: 'auto' } }
            >Iniciar sesión</Button>
          </Grid>
        </Grid>

      </form>

    </Grid>
  );
};