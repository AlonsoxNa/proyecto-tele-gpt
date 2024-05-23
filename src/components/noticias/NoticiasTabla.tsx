import { Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado
import { useFiltroSearchStore } from '@/stores/noticias/filtroSearch.store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FC } from 'react';


export const NoticiasTabla: FC = () => {

  const { noticias } = useFiltroSearchStore();

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
                  alignItems='center'
                  sx={ { backgroundColor: '#DBE3E3', height: '3rem', borderRadius: '0.3rem', px: 2 } }
                >
                  { row.titulo }
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  container
                  alignItems='center'
                  sx={ {
                    backgroundColor: '#DBE3E3',
                    height: '3rem',
                    borderRadius: '0.3rem',
                    px: 2
                  } }
                >
                  { row.fechaRegistro }
                </Grid>
              </TableCell>
              <TableCell>

                <Stack direction="row" spacing={ 1 }>
                  <IconButton sx={ { width: 'auto' } } color="error" ><DeleteIcon /></IconButton>
                  <IconButton sx={ { width: 'auto' } } color={ row.habilitado ? 'error' : 'success' } >
                    { row.habilitado ? <RemoveCircleIcon /> : <AddCircleIcon /> }
                  </IconButton>
                  <IconButton sx={ { width: 'auto' } } color="primary"> <ModeEditIcon /> </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ) ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
