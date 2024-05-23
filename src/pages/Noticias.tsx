import { Grid } from '@mui/material';
import { noticias } from '@/assets/data/noticiasTemporal';
import { NoticiasTabla } from '@/components/noticias/NoticiasTabla';

export const Noticias = () => {

  return (
    <>
      <Grid container className="container">

        {/* Filtros de noticias */ }


        {/* Tabla de noticias */ }
        {/* <TablaSimplev2 rows={ datosResultadospostula } /> */ }
        <NoticiasTabla noticias={ noticias } />

      </Grid>

    </>


  );
};