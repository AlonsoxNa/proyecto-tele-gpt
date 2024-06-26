import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NoticiaService from "../services/Noticias";
import CategoriaService from "@/services/CategoriaService";
import { useLocation } from "react-router-dom";
import CustomizedSnackbars from "@/components/shared/Snackbar";
import { Grid, Typography } from "@mui/material";
import { CustomProgress } from "@/components/shared/CustomProgress";

interface CategoriaInterface{
  id:string;
  nombre:string
}

const ModificarSolofoto = () => {
  const [titulo, setTitulo] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [multimedia, setMultimedia] = useState("");
  const [extension, setExtension] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<CategoriaInterface[]>([]);
  const [errors, setErrors] = useState<any>({});

  const [ isLoading, setIsLoading ] = useState( true );

  const [msgAlert,setMsgAlert] = useState('')
  const [severityAlert,setSeverityAlert] = useState<'success'|'error'|'info'|'warning'>('success')
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const location = useLocation()
  const id = location.state.id;

  const getInfo = async () => {
    const response = await NoticiaService.obtenerNoticiaPorId(id)
    setTitulo(response.titulo)
    setCategoriaId(response.categoriaId)
    setDuracion(response.duracion)
    setMultimedia(response.multimedia)
    setExtension(response.extension)
  }
  const fetchCategorias = async () => {
    //const response = await axios.get(`${API_URL}/categorias`);
    const response = await CategoriaService.obtenerCategorias()
    setCategorias(response);
  };

  useEffect(() => {
    setIsLoading(true)
    fetchCategorias();
    getInfo();
    setIsLoading(false)
  }, []);

  const validateField = (field:string, value:any) => {
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
      case "duracion":
        if (value < 1 || value > 300) {
          error = "La duración debe ser entre 1 y 300 segundos";
        }
        break;
      case "multimedia":
        if (!value) {
          error = "La multimedia es obligatoria";
        }
        break;
      case "extension":
        if (!value) {
          error = "La extensión es obligatoria";
        } else if (!/^(png|jpg|jpeg)$/.test(value)) {
          error = "Los tipos disponibles son: png, jpg y jpeg";
        }
        break;
      case "categoriaId":
        if (!value) {
          error = "La categoría es obligatoria";
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

  const handleDuracionChange = (e:any) => {
    const value = parseInt(e.target.value, 10);
    setDuracion(value);
    validateField("duracion", value);
  };

  const handleImagenChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Obtener solo el contenido base64 sin el prefijo
        setMultimedia(base64String);
        const fileExtension = file.name.split('.').pop();
        setExtension(fileExtension);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoriaChange = (e:any) => {
    const value = e.target.value;
    setCategoriaId(value);
    validateField("categoriaId", value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields before submitting
    validateField("titulo", titulo);
    validateField("duracion", duracion);
    validateField("multimedia", multimedia);
    validateField("extension", extension);
    validateField("categoriaId", categoriaId);

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      setMsgAlert("Por favor corrige los errores antes de enviar el formulario.")
      setSeverityAlert("warning")
      setOpen(true)
      return;
    }
    setIsLoading(true)
    let response = await NoticiaService.modificarNoticiaFoto(id, duracion, titulo, multimedia, extension, categoriaId);
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
        <Typography variant="h3" component="h3" sx={ { fontWeight: 700 } } textAlign="center">Modificar Noticia: Sólo foto</Typography>
      </Grid>
      <CustomProgress open={isLoading} />
      <CustomizedSnackbars message={msgAlert} isOpen={open} handleClose={handleClose} severity={severityAlert}/>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="titulo1" className="form-label">Ingresa título</label>
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
                <label htmlFor="categoria" className="form-label">Elige la categoría</label>
                <select 
                  id="categoria" 
                  className="form-control" 
                  value={categoriaId} 
                  onChange={handleCategoriaChange}
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  ))}
                </select>
                {errors.categoriaId && <div className="text-danger">{errors.categoriaId}</div>}
              </div>
            </div>
            <div className="col-md-6">
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
              <div className="mb-3">
                <div>
                  <label htmlFor="mediaUpload" className="form-label">Sube foto de la noticia</label>
                  
                </div>
                <div>
                <input type="file" accept='.png,.jpg,.jpeg' style={{ display: 'none' }}  onChange={handleImagenChange} className=""/>
                  <label htmlFor="inputArchivo" style={{ cursor: 'pointer', padding: '', border: '1px solid #ccc' }}>
                      {multimedia ? `Archivo seleccionado` : 'Seleccione una imagen'}
                  </label>
                </div>
                {errors.multimedia && <div className="text-danger">{errors.multimedia}</div>}
                {errors.extension && <div className="text-danger">{errors.extension}</div>}
                {multimedia && <img src={`data:image/${extension};base64,${multimedia}`} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Modificar Noticia Foto</button>
        </form>
      </div>
    </Grid>
  );
};

export default ModificarSolofoto;
