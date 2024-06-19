import { Grid, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Grid
      container
      direction="column"
      sx={ {
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F2357',
        color: 'white',
      } }
      gap={ 5 }
    >
      <Grid item>
        <Typography variant="h4" component="h4" sx={ { fontWeight: 700 } } textAlign="center">Página no encontrada</Typography>
      </Grid>
    </Grid>
  )
}

export default NotFound
