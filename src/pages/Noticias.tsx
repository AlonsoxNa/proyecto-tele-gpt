import { FiltrosNoticias } from '@/components/noticias/FiltrosNoticias';
import { NoticiasTabla } from '@/components/noticias/NoticiasTabla';
import { Grid } from '@mui/material';

export const Noticias = () => {

  return (
    <>
      <Grid container className="container">

        {/* Filtros de noticias */ }
        <FiltrosNoticias />

        {/* Tabla de noticias */ }
        <NoticiasTabla />

      </Grid>

    </>


  );
};