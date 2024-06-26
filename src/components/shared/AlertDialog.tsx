import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Alert {
    open:any,
    handleClose:any,
    handleConfirmation:any,
    texto:string,
    tituloDialog:string
}

const AlertDialog = ({open,handleClose, tituloDialog, handleConfirmation,texto}:Alert) => {
  return (
    <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {tituloDialog}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {texto}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant='contained' color='warning' onClick={handleConfirmation} autoFocus>
                Continuar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default AlertDialog
