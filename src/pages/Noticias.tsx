import { HeaderNoticiasTabla } from '@/components/noticias/HeaderNoticiasTabla';
import { NoticiasTabla } from '@/components/noticias/NoticiasTabla';
import { Grid } from '@mui/material';

export const Noticias = () => {

  return (
    <>
      <Grid container className="container">

        {/* Filtros de noticias */ }
        <HeaderNoticiasTabla />

        {/* Tabla de noticias */ }
        <NoticiasTabla />

      </Grid>

    </>


  );
};