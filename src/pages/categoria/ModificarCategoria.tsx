import { CustomProgress } from '@/components/shared/CustomProgress';
import CustomizedSnackbars from '@/components/shared/Snackbar';
import { ErrorValidation } from '@/interfaces/crear-anuncio';
import CategoriaService from '@/services/CategoriaService';
import { Grid, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ModificarCategoria: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state as { id: string } || {};

    const [nombre, setNombre] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorValidation>({});

    const [msgAlert, setMsgAlert] = useState('');
    const [severityAlert, setSeverityAlert] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [open, setOpen] = useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const validateField = (field: string, value: string) => {
        let error = '';
        if (!value) {
            error = 'El nombre es obligatorio';
        } else if (value.length < 3) {
            error = 'El nombre debe tener un mínimo de 3 caracteres';
        } else if (value.length > 20) {
            error = 'El nombre debe tener un máximo de 20 caracteres';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const handleNombreChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const value = target.value;
        setNombre(value);
        validateField('nombre', value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await CategoriaService.modificarCategoria(id, nombre); // Pasar el ID a la función
            setIsLoading(false);
            if (response.success) {
                setSeverityAlert('success');
                setMsgAlert(response.message);
                setOpen(true);
                setTimeout(() => {
                    navigate('/admin/gestion-categoria');
                }, 1500);
            } else {
                setSeverityAlert('error');
                setMsgAlert(response.message);
                setOpen(true);
            }
        } catch (error) {
            console.error('Error al modificar la categoría:', error);
            setIsLoading(false);
            setSeverityAlert('error');
            setMsgAlert('Error al modificar la categoría');
            setOpen(true);
        }
    };

    const cargarCategoria = async () => {
        if (id) {
            setIsLoading(true);
            try {
                const response = await CategoriaService.obtenerCategoriaPorId(id);
                console.log("categoria:", response);
                if (response) {
                    setNombre(response.nombre);
                } else {
                    setSeverityAlert('error');
                    setMsgAlert('Error al obtener la categoría');
                    setOpen(true);
                }
            } catch (error) {
                console.error('Error al obtener la categoría:', error);
                setSeverityAlert('error');
                setMsgAlert('Error al obtener la categoría');
                setOpen(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarCategoria();
    }, [id]);

    return (
        <Grid container>
            <Grid sx={{ width: '100%', mb: '1.5rem' }}>
                <Typography variant="h3" component="h3" sx={{ fontWeight: 700 }} textAlign="center">
                    Modificar Categoría
                </Typography>
            </Grid>
            <CustomProgress open={isLoading} />
            <CustomizedSnackbars message={msgAlert} isOpen={open} handleClose={handleClose} severity={severityAlert} />
            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Ingresa nombre de categoria
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                />
                           
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </Grid>
    );
};

export default ModificarCategoria;