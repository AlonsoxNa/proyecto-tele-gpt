import CustomizedSnackbars from "@/components/shared/Snackbar";
import CategoriaService from "@/services/CategoriaService";
import { Grid, Typography } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import NoticiaService from "../services/Noticias";
import { ErrorValidation, Categoria } from '@/interfaces/crear-anuncio';
import { CustomProgress } from "@/components/shared/CustomProgress";

const Solovideo = () => {
  const [titulo, setTitulo] = useState("");
  const [multimediaUrl, setMultimediaUrl] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [duracion, setDuracion] = useState(0);
  const [errors, setErrors] = useState<ErrorValidation>({});

  const [ isLoading, setIsLoading ] = useState( false );

  const [msgAlert,setMsgAlert] = useState('')
  const [severityAlert,setSeverityAlert] = useState<'success'|'error'|'info'|'warning'>('success')
  const [open, setOpen] = useState(false);
  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await CategoriaService.obtenerCategorias();
      setCategorias(response);
    };
    setIsLoading(true)
    fetchCategorias();
    setIsLoading(false)
  }, []);

  const validateField = (field: string, value: string) => {
    let error = "";
    const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    
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
      case "multimediaUrl":
        
        if (!value) {
          error = "El URL del video es obligatorio";
        } else if (!youtubeRegex.test(value)) {
          error = "El URL debe ser un enlace válido de YouTube";
        }
        break;
      case "categoriaId":
        if (!value) {
          error = "La categoría es obligatoria";
        }
        break;
      case "duracion":
        if (Number(value) < 1 || Number(value) > 300) {
          error = "La duración debe ser entre 1 y 300 segundos";
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
  };

  const handleTituloChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setTitulo(value);
    validateField("titulo", value);
  };

  const handleMultimediaUrlChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setMultimediaUrl(value);
    validateField("multimediaUrl", value);
  };

  const handleCategoriaChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const value = target.value;
    setCategoriaId(value);
    validateField("categoriaId", value);
  };

  const handleDuracionChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(target.value, 10);
    setDuracion(value);
    validateField("duracion", String(value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tipo = "Url";

    // Validate all fields before submitting
    validateField("titulo", titulo);
    validateField("multimediaUrl", multimediaUrl);
    validateField("categoriaId", categoriaId);
    validateField("duracion", String(duracion));

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      setMsgAlert("Por favor corrige los errores antes de enviar el formulario.")
      setSeverityAlert("warning")
      setOpen(true)
      return;
    }
    setIsLoading(true)
    const response = await NoticiaService.registrarNoticiaVideo(duracion, titulo, tipo, multimediaUrl, categoriaId);
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
        <Typography variant="h3" component="h3" sx={ { fontWeight: 700 } } textAlign="center">Registro Noticia: Sólo video</Typography>
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
                <label htmlFor="mediaUrl" className="form-label">Ingresa la URL del video</label>
                <input 
                  type="text" 
                  id="mediaUrl" 
                  name="mediaUrl" 
                  className="form-control" 
                  value={multimediaUrl}
                  onChange={handleMultimediaUrlChange} 
                />
                {errors.multimediaUrl && <div className="text-danger">{errors.multimediaUrl}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="duracion" className="form-label">Duración en pantalla segundos (Duración del video)</label>
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
          <button type="submit" className="btn btn-primary">Crear Noticia Video</button>
        </form>
      </div>
    </Grid>
  );
};

export default Solovideo;
