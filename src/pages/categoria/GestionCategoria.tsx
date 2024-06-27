import { CheckBox } from '@mui/icons-material';
import {
    Alert,
    Backdrop,
    Container,
    Grid,
    IconButton,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '@/components/shared/AlertDialog';
import CategoriaService from '@/services/CategoriaService';
import useCategoria from '@/hooks/useCategoria';

const GestionCategoria = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { categorias, obtenerCategorias } = useCategoria();

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [messageSnackbar, setMessageSnackbar] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const [textoAlert, setTextoAlert] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [idSelect, setIdSelect] = useState('');
    const [tituloAlert, setTituloAlert] = useState('');

    const navigate = useNavigate();

    const handleModificarCategoria = (id: string) => {
        navigate(`/admin/modificar-categoria`, { state: { id } });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        setIsLoading(true);
        obtenerCategorias();
        setIsLoading(false);
    }, []);


    // TODO: Implementar método para borrar noticia
    const handleDeleteCategoria = async (id: string) => {
        setIsLoading(true);
        const response = await CategoriaService.eliminarCategoria(id);
        if (response.success) {
            setMessageSnackbar(response.message);
            setIsError(false);
            obtenerCategorias();
        } else {
            setMessageSnackbar(response.message);
            setIsError(true);
        }
        setIsLoading(false);
    };

    return (
        <Grid container>
            <Container>
                <Grid sx={{ width: '100%', mb: '1.5rem' }}>
                    <Typography variant="h3" component="h3" sx={{ fontWeight: 700 }} textAlign="center">
                        Gestión de Categorias
                    </Typography>
                </Grid>
                <TableContainer>
                    <Table sx={{ borderCollapse: 'collapse', mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {categorias.map((row: any) => (
                                <TableRow key={row.id} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                                    <TableCell>
                                        <Grid container alignItems="center" sx={{ height: '3rem', borderRadius: '0.3rem' }}>
                                            {row.nombre}
                                        </Grid>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                sx={{ width: 'auto', backgroundColor: '#ffc6ba' }}
                                                color="error"
                                                onClick={() => {
                                                    setTextoAlert(`¿Quieres eliminar la categoria: "${row.nombre}"?`);
                                                    setTituloAlert('Eliminar registro');
                                                    setIdSelect(row.id);
                                                    setOpenAlert(true);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => handleModificarCategoria(row.id)}
                                                sx={{ width: 'auto', backgroundColor: '#c6def5' }}
                                                color="primary"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity={isError ? 'error' : 'success'}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {messageSnackbar}
                        </Alert>
                    </Snackbar>
                    <AlertDialog
                        texto={textoAlert}
                        open={openAlert}
                        tituloDialog={tituloAlert}
                        handleClose={() => setOpenAlert(false)}
                        handleConfirmation={() => {
                            handleDeleteCategoria(idSelect);
                            setOpenAlert(false);
                        }}
                    />
                </TableContainer>
            </Container>
        </Grid>
    );
};

export default GestionCategoria;