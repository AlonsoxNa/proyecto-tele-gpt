import { useFiltroSearchStore } from '@/stores/noticias/filtroSearch.store';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';

export const FiltrosNoticias: FC = () => {

  const { handleChangeFiltroSearch, handleChangeFiltroStatus, filtroSearch, filtroStatus } = useFiltroSearchStore();

  const handleChangeStatusNoticia = ( { target }: SelectChangeEvent ) => {
    const { value } = target;
    handleChangeFiltroStatus( value );
  };

  const handleChangeSearch = ( { target }: ChangeEvent<HTMLInputElement> ) => {
    handleChangeFiltroSearch( target.value );
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
        md={ 4 }
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
      <Grid item xs={ 12 } md={ 4 } sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } } gap={ 1 }>
        <FilterAltIcon />
        <FormControl sx={ { minWidth: '40%' } }>

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
      <Grid item xs={ 12 } md={ 4 } sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
        <Button
          variant="contained"
          color="primary"
          disabled
          sx={ { width: 'auto' } }
          startIcon={ <RemoveCircleIcon /> }
        >
          Ocultar seleccionadas
        </Button>
      </Grid>
    </Grid>
  );
};