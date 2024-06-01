import { HeaderNoticiasTabla } from '@/components/noticias/HeaderNoticiasTabla';
import { NoticiasTabla } from '@/components/noticias/NoticiasTabla';
import { Grid,Container } from '@mui/material';

export const Noticias = () => {

  return (
    <>
      <Grid container>
        <Container >
          {/* Filtros de noticias */ }
          <HeaderNoticiasTabla />

          {/* Tabla de noticias */ }
          <NoticiasTabla />

        </Container>

      </Grid>

    </>


  );
};