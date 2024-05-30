import { ResponseCambiarEstadoNoticia } from '@/interfaces/Noticia';
import { cambiarEstadoNoticiasAPI } from '@/services/noticiasService';
import { useNoticiasStore } from '@/stores/noticias/noticias.store';
import { useSelectNoticias } from '@/stores/noticias/selectNoticias.store';
import { AddCircle } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Backdrop, Button, CircularProgress, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

export const HeaderNoticiasTabla: FC = () => {

  const { handleChangeFiltroSearch, handleChangeFiltroStatus, filtroSearch, filtroStatus } = useNoticiasStore();
  const fetchNoticias = useNoticiasStore( state => state.fetchNoticias );
  const { noticiasSelected } = useSelectNoticias();

  // snackbar
  const [ isLoading, setIsLoading ] = useState( false );
  const [ openSnackbar, setOpenSnackbar ] = useState<boolean>( false );
  const [ messageSnackbar, setMessageSnackbar ] = useState<string>( "" );
  const [ isError, setIsError ] = useState<boolean>( false );

  const handleCloseSnackbar = () => {
    setOpenSnackbar( false );
  };

  const handleChangeStatusNoticia = ( { target }: SelectChangeEvent ) => {
    const { value } = target;
    handleChangeFiltroStatus( value );
  };

  const handleChangeSearch = ( { target }: ChangeEvent<HTMLInputElement> ) => {
    handleChangeFiltroSearch( target.value );
  };

  const handleCambiarEstadoNoticias = async ( estado: boolean ) => {
    setIsLoading( true );
    const response: ResponseCambiarEstadoNoticia = await cambiarEstadoNoticiasAPI( noticiasSelected, estado ) as ResponseCambiarEstadoNoticia;

    if ( response.status === 200 ) {
      setMessageSnackbar( `Has ${ estado ? 'mostrado' : 'ocultado' } las noticias seleccionadas correctamente` );
      setIsError( false );
    } else {
      setMessageSnackbar( `Error al ${ estado ? 'mostrar' : 'ocultar' } las noticias seleccionadas` );
      setIsError( true );
    }
    setOpenSnackbar( true );
    fetchNoticias();
    setIsLoading( false );
  };

  return (
    <Grid
      container
      spacing={ 2 }
      justifyContent="space-between"
      alignItems="center"
      sx={ {
        px: 2
      } }
    >
      <Grid
        item
        xs={ 12 }
        md={ 3 }
      >
        <TextField
          variant="outlined"
          placeholder="Buscar noticia..."
          value={ filtroSearch }
          InputProps={ {
            startAdornment: <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          } }
          onChange={ handleChangeSearch }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 } sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } } gap={ 1 }>
        <FilterAltIcon />
        <FormControl sx={ { minWidth: '60%' } }>

          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ filtroStatus }
            label="Estado"
            onChange={ handleChangeStatusNoticia }
          >
            <MenuItem value={ 'Todas' }>Todas</MenuItem>
            <MenuItem value={ 'Disponibles' }>Disponibles</MenuItem>
            <MenuItem value={ 'Ocultas' }>Ocultas</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={ 12 } md={ 6 } sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } } gap={ 1 }>
        <Button
          variant="contained"
          color="error"
          disabled={ noticiasSelected.length === 0 }
          sx={ { width: 'auto' } }
          startIcon={ <RemoveCircleIcon /> }
          onClick={ () => handleCambiarEstadoNoticias( false ) }
        >
          Ocultar seleccionadas
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={ noticiasSelected.length === 0 }
          sx={ { width: 'auto' } }
          startIcon={ <AddCircle /> }
          onClick={ () => handleCambiarEstadoNoticias( true ) }
        >
          Mostrar seleccionadas
        </Button>
      </Grid>
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
    </Grid>
  );
};