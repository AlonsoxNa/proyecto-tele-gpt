import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Button } from '@mui/material';
// import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado

interface Noticia {
  id: number;
  titulo: string;
  fechaRegistro: string;
}

interface Props {
  noticias: Noticia[];
}

export const NoticiasTabla = ( { noticias }: Props ) => {
  return (
    <TableContainer>
      <Table
        sx={ { borderCollapse: 'collapse' } }>
        <TableHead>
          <TableRow>
            <TableCell>
              Noticia
            </TableCell>
            <TableCell>
              Fecha
            </TableCell>
            <TableCell>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          { noticias.map( ( row ) => (
            <TableRow key={ row.id }>
              <TableCell >
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  sx={ { backgroundColor: '#0F2357', color: 'white', height: '3rem', borderRadius: '0.3rem' } }
                >
                  { row.titulo }
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  sx={ {
                    backgroundColor: '#DBE3E3',
                    height: '3rem',
                    borderRadius: '0.3rem'

                  } }
                >
                  { row.fechaRegistro }
                </Grid>
              </TableCell>
              <TableCell>
                <Button sx={ { width: 'auto', mx: 1 } } variant="contained" color="error" >Eliminar</Button>
                <Button sx={ { width: 'auto', mx: 1 } } variant="contained">Ocultar</Button>
                <Button sx={ { width: 'auto', mx: 1 } } variant="contained">Modificar</Button>
              </TableCell>
            </TableRow>
          ) ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
