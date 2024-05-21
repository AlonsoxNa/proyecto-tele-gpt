import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useState } from 'react';

export const LoginForm = () => {
  const [ showPassword, setShowPassword ] = useState( false );

  const handleClickShowPassword = () => setShowPassword( ( show ) => !show );

  return (
    <Grid item xs={ 12 } >

      <form action="">

        <Grid container direction="column" gap={ 3 } >

          <Grid item>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email">Correo electrónico</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                label="Correo electrónico"
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={ showPassword ? 'text' : 'password' }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={ handleClickShowPassword }
                      edge="end"
                    >
                      { showPassword ? <VisibilityOff /> : <Visibility /> }
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
          </Grid>

          <Grid container justifyContent="center">
            <Button variant="contained" type="submit" sx={ { width: 'auto' } }>Iniciar sesión</Button>
          </Grid>
        </Grid>

      </form>

    </Grid>
  );
};