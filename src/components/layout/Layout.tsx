import Navbar from '@/Componentes/Navbar';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Box  sx={{ display: 'flex' }}>
      {/* Navbar */ }
      <Navbar />

      <Grid container sx={{mt:"5.5rem"}}>
        {/* Children */ }
        <Outlet />
      </Grid>

      {/* Footer??? */ }
    </Box>
  );
};