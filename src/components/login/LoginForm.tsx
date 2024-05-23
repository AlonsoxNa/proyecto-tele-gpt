import { useForm } from '@/hooks/useForm';
import { LoginFormData, responseAuth } from '@/interfaces/Login';
import { useUserStore } from '@/stores/user.store';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Backdrop, Button, CircularProgress, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/authServices';

export const LoginForm: FC = () => {

  const navigate = useNavigate();
  const { handleLogin } = useUserStore();

  const { form, errors, handleChange, handleValidateAll, handleValidate } = useForm<LoginFormData>( {
    email: '',
    password: ''
  } );

  const [ showPassword, setShowPassword ] = useState( false );

  const [ isLoading, setIsLoading ] = useState( false );

  const handleClickShowPassword = () => setShowPassword( ( show ) => !show );

  const handleClose = () => {
    setIsLoading( false );
  };

  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    setIsLoading( true );
    e.preventDefault();

    const errors = await handleValidateAll();
    if ( errors.length === 0 ) {
      const response: responseAuth = await login( form.email, form.password ) as responseAuth; // Explicitly type the response variable as responseAuth

      if ( response.status === 200 ) {
        handleLogin( form.email, form.email, response.data );
        setIsLoading( false );
        navigate( '/home' );
      }
    }
    setIsLoading( false );
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
              onBlur={ ( e ) => handleValidate( e.target.name ) }
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
              onBlur={ ( e ) => handleValidate( e.target.name ) }
              fullWidth
            />
          </Grid>
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              sx={ { width: 'auto' } }
              disabled={ isLoading }
            >Iniciar sesión</Button>
          </Grid>
        </Grid>

      </form>

      {/* Loading */ }
      <Backdrop
        sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
        open={ isLoading }
        onClick={ handleClose }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};