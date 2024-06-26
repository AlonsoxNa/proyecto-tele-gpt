import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import NoticiaService from "../services/Noticias";
import CategoriaService from "@/services/CategoriaService";
import { Grid, Typography } from "@mui/material";
import CustomizedSnackbars from "@/components/shared/Snackbar";
import { CustomProgress } from "@/components/shared/CustomProgress";

const Solotexto = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [duracion, setDuracion] = useState(0);
  const [errors, setErrors] = useState<any>({});

  const [ isLoading, setIsLoading ] = useState( false );

  const [msgAlert,setMsgAlert] = useState('')
  const [severityAlert,setSeverityAlert] = useState<'success'|'error'|'info'|'warning'>('success')
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      //const response = await axios.get(`${API_URL}/categorias`);
      const response = await CategoriaService.obtenerCategorias()
      setCategorias(response);
    };
    setIsLoading(true)
    fetchCategorias();
    setIsLoading(false)
    }, []);

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "titulo":
        if (!value) {
          error = "El título es obligatorio";
        } else if (value.length < 5) {
          error = "El título debe tener un mínimo de 5 caracteres";
        } else if (value.length > 50) {
          error = "El título debe tener un máximo de 50 caracteres";
        }
        break;
      case "contenido":
        if (!value) {
          error = "El contenido es obligatorio";
        } else if (value.length < 5) {
          error = "El contenido debe tener un mínimo de 5 caracteres";
        } else if (value.length > 500) {
          error = "El contenido debe tener un máximo de 500 caracteres";
        }
        break;
      case "categoriaId":
        if (!value) {
          error = "La categoría es obligatoria";
        }
        break;
      case "duracion":
        if (value < 1 || value > 300) {
          error = "La duración debe ser entre 1 y 300 segundos";
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
  };

  const handleTituloChange = (e:any) => {
    const value = e.target.value;
    setTitulo(value);
    validateField("titulo", value);
  };

  const handleContenidoChange = (e:any) => {
    const value = e.target.value;
    setContenido(value);
    validateField("contenido", value);
  };

  const handleCategoriaChange = (e:any) => {
    const value = e.target.value;
    setCategoriaId(value);
    validateField("categoriaId", value);
  };

  const handleDuracionChange = (e:any) => {
    const value = parseInt(e.target.value, 10);
    setDuracion(value);
    validateField("duracion", value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tipo = "Publicacion";

    // Validate all fields before submitting
    validateField("titulo", titulo);
    validateField("contenido", contenido);
    validateField("categoriaId", categoriaId);
    validateField("duracion", duracion);

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      setMsgAlert("Por favor corrige los errores antes de enviar el formulario.")
      setSeverityAlert("warning")
      setOpen(true)
      return;
    }
    setIsLoading(true)
    let response = await NoticiaService.registrarNoticiaPublicacion(duracion, titulo, contenido, tipo, categoriaId);
    setIsLoading(false)
    if (response.success){
      setMsgAlert(response.message)
      setSeverityAlert("success")
      setOpen(true)
    }else{
      setMsgAlert(response.message)
      setSeverityAlert("error")
      setOpen(true)
    }
  };

  return (
    <Grid container>
      <Grid sx={{width:"100%", mb:"1.5rem" }}>
        <Typography variant="h3" component="h3" sx={ { fontWeight: 700 } } textAlign="center">Registro Noticia: Sólo texto</Typography>
      </Grid>
      <CustomProgress open={isLoading} />
      <CustomizedSnackbars message={msgAlert} isOpen={open} handleClose={handleClose} severity={severityAlert}/>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="titulo1" className="form-label">Ingresa título de la publicación</label>
                <input 
                  type="text" 
                  id="titulo1" 
                  className="form-control" 
                  value={titulo} 
                  onChange={handleTituloChange} 
                />
                {errors.titulo && <div className="text-danger">{errors.titulo}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Ingresa contenido de la publicación</label>
                <textarea 
                  id="descripcion" 
                  className="form-control" 
                  rows={8} 
                  value={contenido} 
                  onChange={handleContenidoChange}
                ></textarea>
                {errors.contenido && <div className="text-danger">{errors.contenido}</div>}
              </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Elige la categoría</label>
                <select 
                  id="categoria" 
                  className="form-control" 
                  value={categoriaId} 
                  onChange={handleCategoriaChange}
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria:any) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  ))}
                </select>
                {errors.categoriaId && <div className="text-danger">{errors.categoriaId}</div>}
              </div>
              {/* <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Elige la fecha de la publicación</label>
                <SelecctorFechas />
              </div> */}
              <div className="mb-3">
                <label htmlFor="duracion" className="form-label">Duración en pantalla (segundos)</label>
                <input 
                  type="number" 
                  id="duracion" 
                  className="form-control" 
                  min="1" 
                  max="300"
                  step="1" 
                  value={duracion} 
                  onChange={handleDuracionChange} 
                />
                {errors.duracion && <div className="text-danger">{errors.duracion}</div>}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Crear Publicación</button>
        </form>
      </div>
    </Grid>
  );
};

export default Solotexto;
