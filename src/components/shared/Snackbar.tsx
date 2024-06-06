import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarInterface{
    message:string;
    isOpen:boolean;
    handleClose():any;
    severity:'success'|'error'|'info'|'warning'
}

export default function CustomizedSnackbars({message,isOpen,handleClose,severity}:SnackbarInterface) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}