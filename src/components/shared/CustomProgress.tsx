import { Backdrop, CircularProgress } from '@mui/material';

interface Progress{
    open:boolean
}

export const CustomProgress = ( { open } : Progress ) => {
  return (
    <Backdrop
      sx={ { color: '#fff', zIndex: ( theme ) => theme.zIndex.drawer + 1 } }
      open={ open }
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};