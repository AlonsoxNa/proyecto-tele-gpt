import { Grid } from '@mui/material';
import { noticias } from '@/assets/data/noticiasTemporal';
import { NoticiasTabla } from '@/components/noticias/NoticiasTabla';
import { FiltrosNoticias } from '@/components/noticias/FiltrosNoticias';

export const Noticias = () => {

  return (
    <>
      <Grid container className="container">

        {/* Filtros de noticias */ }
        <FiltrosNoticias />

        {/* Tabla de noticias */ }
        <NoticiasTabla noticias={ noticias } />

      </Grid>

    </>


  );
};