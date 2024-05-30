import { Alert, Backdrop, Checkbox, CircularProgress, Grid, IconButton, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado
import { ResponseCambiarEstadoNoticia } from '@/interfaces/Noticia';
import { cambiarEstadoNoticiaAPI } from '@/services/noticiasService';
import { useNoticiasStore } from '@/stores/noticias/noticias.store';
import { useSelectNoticias } from '@/stores/noticias/selectNoticias.store';
import { formatDate } from '@/utils/noticias/convertirFecha';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { convertirTipoNoticia } from '@/utils/noticias/convertirTipoNoticia';
import { estilosTipoNoticia } from '@/assets/noticias/tipoNoticia';


export const NoticiasTabla: FC = () => {

  const [ isLoading, setIsLoading ] = useState( true );
  const noticiasFiltradas = useNoticiasStore( state => state.noticiasFiltradas );
  const fetchNoticias = useNoticiasStore( state => state.fetchNoticias );
  const { noticiasSelected, handleAddNoticia, handleAddAll, handleClear } = useSelectNoticias();

  const [ openSnackbar, setOpenSnackbar ] = useState<boolean>( false );
  const [ messageSnackbar, setMessageSnackbar ] = useState<string>( "" );
  const [ isError, setIsError ] = useState<boolean>( false );


  const handleCloseSnackbar = () => {
    setOpenSnackbar( false );
  };

  useEffect( () => {
    fetchNoticias();
    setIsLoading( false );
  }, [ fetchNoticias ] );

  const handleChangeStatusNoticia = async ( id: string, status: boolean ) => {
    setIsLoading( true );

    const response: ResponseCambiarEstadoNoticia = await cambiarEstadoNoticiaAPI( id, !status ) as ResponseCambiarEstadoNoticia;

    if ( response.status === 204 ) {
      setMessageSnackbar( `Has ${ status ? 'ocultado' : 'mostrado' } esta noticia correctamente` );
      setIsError( false );
    } else {
      setMessageSnackbar( `Error al ${ status ? 'ocultar' : 'mostrar' } la noticia` );
      setIsError( true );
    }
    setOpenSnackbar( true );
    fetchNoticias();
    setIsLoading( false );
  };

  // TODO: Implementar método para borrar noticia
  /* const handleDeleteNoticia = async ( id: string ) => {
    setIsLoading( true );


    setIsLoading( false );
  }; */

  // TODO: Implementar método para redireccionar a vista para modificar noticia
  /* const handleModificarNoticia = async ( noticia: Noticia ) => {
    navigate( '/admin/noticias/modificar', { state: { noticia } } );
  }; */

  const handleChangeSelectAll = ( event: ChangeEvent<HTMLInputElement> ) => {
    if ( event.target.checked ) {
      handleAddAll( noticiasFiltradas );
    } else {
      handleClear();
    }
  };

  return (
    <TableContainer>
      <Table
        sx={ { borderCollapse: 'collapse', mt: 2 } }>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={ noticiasSelected.length > 0 && noticiasSelected.length === noticiasFiltradas.length }
                onChange={ handleChangeSelectAll }
              />
            </TableCell>
            <TableCell>
              Noticia
            </TableCell>
            <TableCell>
              Categoría
            </TableCell>
            <TableCell>
              <Grid container sx={ { pl: 0.8 } }>
                Tipo
              </Grid>
            </TableCell>
            <TableCell>
              Fecha
            </TableCell>
            <TableCell>
              <Grid container sx={ { pl: 0.8 } }>
                Estado
              </Grid>
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
              sx={ { backgroundColor: noticiasSelected.includes( row.id ) ? '#E4F4FD' : '', borderRadius: 1, overflow: 'hidden' } }
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={ noticiasSelected.includes( row.id ) }
                  onClick={ () => handleAddNoticia( row ) }
                />
              </TableCell>
              <TableCell >
                <Grid
                  container
                  alignItems='center'
                  sx={ { height: '3rem', borderRadius: '0.3rem' } }
                >
                  { row.titulo }
                </Grid>
              </TableCell>
              <TableCell >
                <Grid
                  container
                  alignItems='center'
                  sx={ { height: '3rem', borderRadius: '0.3rem' } }
                >
                  { row.categoria.nombre }
                </Grid>
              </TableCell>
              <TableCell >
                <Grid container alignItems='center' sx={ { height: '3rem' } }>
                  <Typography
                    sx={ {
                      width: 'auto',
                      fontWeight: 400,
                      fontSize: 14,
                      p: 0.8,
                      borderRadius: 3,
                      backgroundColor: estilosTipoNoticia[ row.tipo ].backgroundColor,
                      color: estilosTipoNoticia[ row.tipo ].textColor
                    } }>
                    { convertirTipoNoticia( row.tipo ) }
                  </Typography>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  container
                  alignItems='center'
                  sx={ {
                    height: '3rem',
                    borderRadius: '0.3rem',
                  } }
                >
                  { formatDate( row.fechaRegistro ) }
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container sx={ { height: '3rem' } } alignItems='center'>
                  <Typography
                    sx={ {
                      width: 'auto',
                      fontWeight: 400,
                      fontSize: 14,
                      backgroundColor: !row.habilitado ? '#ffc6ba' : '#c7ffc9',
                      p: 0.8,
                      borderRadius: 3
                    } }>
                    { row.habilitado ? 'Mostrado' : 'Oculto' }
                  </Typography>
                </Grid>
              </TableCell>
              <TableCell>

                <Stack direction="row" spacing={ 1 }>
                  <IconButton sx={ { width: 'auto', backgroundColor: '#ffc6ba' } } color="error" ><DeleteIcon /></IconButton>
                  <IconButton
                    sx={ { width: 'auto', backgroundColor: row.habilitado ? '#ffc6ba' : '#c7ffc9' } }
                    color={ row.habilitado ? 'error' : 'success' }
                    onClick={ () => handleChangeStatusNoticia( row.id, row.habilitado ) }
                  >
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
          severity={ isError ? 'error' : 'success' }
          variant="filled"
          sx={ { width: '100%' } }
        >
          { messageSnackbar }
        </Alert>
      </Snackbar>
    </TableContainer >
  );
};
