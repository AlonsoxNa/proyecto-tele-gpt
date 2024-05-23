import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const STATUS_NOTICIAS = {
  TODAS: 'Todas',
  DISPONIBLES: 'Disponibles',
  OCULTAS: 'Ocultas'
};

export const FiltrosNoticias = () => {

  const [ statusNoticia, setStatusNoticia ] = useState( STATUS_NOTICIAS.TODAS );

  const handleChangeStatusNoticia = ( { target }: SelectChangeEvent ) => {
    const { value } = target;
    setStatusNoticia( value );
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
          InputProps={ {
            startAdornment: <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          } }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 4 } sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } } gap={ 1 }>
        <FilterAltIcon />
        <FormControl sx={ { minWidth: '40%' } }>

          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ statusNoticia }
            label="Estado"
            onChange={ handleChangeStatusNoticia }
          >
            <MenuItem value={ 'Todas' }>Todas</MenuItem>
            <MenuItem value={ 'Disponibles' }>Disponibles</MenuItem>
            <MenuItem value={ 'Ocultas' }>Ocultas</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={ 12 } md={ 4 } sx={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } } gap={ 1 }>

        <Button
          variant="contained"
          color="primary"
          disabled
          sx={ { width: 'auto' } }>
          <RemoveCircleIcon />
          Ocultar todas
        </Button>
      </Grid>
    </Grid>
  );
};