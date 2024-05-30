import { HeaderNoticiasTabla } from '@/components/noticias/HeaderNoticiasTabla';
import { NoticiasTabla } from '@/components/noticias/NoticiasTabla';
import { Grid } from '@mui/material';

export const Noticias = () => {

  return (
    <>
      <Grid container className="container" sx={{mt:"1rem"}}>

        {/* Filtros de noticias */ }
        <HeaderNoticiasTabla />

        {/* Tabla de noticias */ }
        <NoticiasTabla />

      </Grid>

    </>


  );
};