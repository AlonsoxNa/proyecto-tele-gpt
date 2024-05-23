import { LoginForm } from '@/components/login/LoginForm';
import { Grid, Typography } from '@mui/material';




export const Login = () => {

  return (
    <Grid
      container
      direction="column"
      sx={ {
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F2357',
        color: 'white',
      } }
      gap={ 5 }
    >
      <Grid item>
        <Typography variant="h4" component="h4" sx={ { fontWeight: 700 } } textAlign="center">Sistema de anuncios en Televisor ICC</Typography>
      </Grid>
      <Grid
        item
        sx={ {
          backgroundColor: '#FFFFFF',
          opacity: 0.9,
          color: 'black',
          minWidth: '20%',
          p: 4,
          borderRadius: 1.5
        } }>
        <Typography textAlign="center" variant="h4" component="h4" mb={ 6 }>Inicia sesión</Typography>

        <LoginForm />

      </Grid>
    </Grid>
  );
};