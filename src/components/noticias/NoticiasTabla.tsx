import { Alert, Backdrop, CircularProgress, Grid, IconButton, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado
import { useNoticiasStore } from '@/stores/noticias/noticias.store';
import { useSelectNoticias } from '@/stores/noticias/selectNoticias.store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FC, useEffect, useState } from 'react';
import { formatDate } from '@/utils/noticias/convertirFecha';


export const NoticiasTabla: FC = () => {

  const [ isLoading, setIsLoading ] = useState( true );
  const noticiasFiltradas = useNoticiasStore( state => state.noticiasFiltradas );
  const fetchNoticias = useNoticiasStore( state => state.fetchNoticias );
  const { noticiasSelected, handleAddNoticia } = useSelectNoticias();

  const [ openSnackbar, setOpenSnackbar ] = useState<boolean>( false );
  // const [ messageSnackbar, setMessageSnackbar ] = useState<string>( "" );
  // const [ isError, setIsError ] = useState<boolean>( false );

  const handleCloseSnackbar = () => {
    setOpenSnackbar( false );
  };

  useEffect( () => {
    fetchNoticias();
    setIsLoading( false );
  }, [ fetchNoticias ] );

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
          { noticiasFiltradas.map( ( row ) => (
            <TableRow
              key={ row.id }
              onClick={ () => handleAddNoticia( row ) }
              sx={ { cursor: 'pointer', backgroundColor: noticiasSelected.includes( row ) ? '#757ce8' : '', borderRadius: 1, overflow: 'hidden' } }
            >
              <TableCell >
                <Grid
                  container
                  alignItems='center'
                  sx={ { height: '3rem', borderRadius: '0.3rem', px: 2 } }
                >
                  { row.titulo }
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  container
                  alignItems='center'
                  sx={ {
                    height: '3rem',
                    borderRadius: '0.3rem',
                    px: 2
                  } }
                >
                  { formatDate( row.fechaRegistro ) }
                </Grid>
              </TableCell>
              <TableCell>

                <Stack direction="row" spacing={ 1 }>
                  <IconButton sx={ { width: 'auto', backgroundColor: '#ffc6ba' } } color="error" ><DeleteIcon /></IconButton>
                  <IconButton sx={ { width: 'auto', backgroundColor: row.habilitado ? '#ffc6ba' : '#c7ffc9' } } color={ row.habilitado ? 'error' : 'success' } >
                    { row.habilitado ? <RemoveCircleIcon /> : <AddCircleIcon /> }
                  </IconButton>
                  <IconButton sx={ { width: 'auto', backgroundColor: '#c6def5' } } color="primary"> <ModeEditIcon /> </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ) ) }
        </TableBody>
      </Table>
      {/* Loading */ }
      <Backdrop
        sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
        open={ isLoading }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={ openSnackbar } autoHideDuration={ 6000 } onClose={ handleCloseSnackbar }>
        <Alert
          onClose={ handleCloseSnackbar }
          // severity={ isError ? 'error' : 'success' }
          variant="filled"
          sx={ { width: '100%' } }
        >
          {/* { messageSnackbar } */ }
        </Alert>
      </Snackbar>
    </TableContainer >
  );
};
