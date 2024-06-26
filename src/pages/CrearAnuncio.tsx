import CustomizedSnackbars from "@/components/shared/Snackbar";
import { Categoria, ErrorValidation } from "@/interfaces/crear-anuncio";
import CategoriaService from "@/services/CategoriaService";
import { Grid, Typography } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import NoticiaService from "../services/Noticias";


const CrearAnuncio = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [duracion, setDuracion] = useState(0);
  const [multimedia, setMultimedia] = useState("");
  const [extension, setExtension] = useState("");
  const [errors, setErrors] = useState<ErrorValidation>({});

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
      //const response = await axios.get(`${API_URL}/categorias`);
      const response = await CategoriaService.obtenerCategorias()
      setCategorias(response);
    };
    fetchCategorias();
  }, []);

  const validateField = (field: string, value: string) => {
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
        if (Number(value) < 1 || Number(value) > 300) {
          error = "La duración debe ser entre 1 y 300 segundos";
        }
        break;
      case "multimedia":
        if (!value) {
          error = "El archivo multimedia es obligatorio";
        }
        break;
      case "extension":
        if (!["png", "jpg", "jpeg"].includes(value)) {
          error = "Los tipos disponibles son: png, jpg y jpeg";
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

  const handleContenidoChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setContenido(value);
    validateField("contenido", value);
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

  const handleImagenChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultString = String(reader.result);
        const base64String = resultString.split(',')[1]; // Obtener solo el contenido base64 sin el prefijo
        setMultimedia(base64String);
        const fileExtension = file.name.split('.').pop();
        setExtension(fileExtension!);
        validateField("multimedia", base64String);
        validateField("extension", fileExtension!);
      };
      reader.readAsDataURL(file);
    }
    
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tipo = "Normal";
    
    validateField("titulo", titulo);
    validateField("contenido", contenido);
    validateField("categoriaId", categoriaId);
    validateField("duracion", String(duracion));
    validateField("multimedia", multimedia);
    validateField("extension", extension);

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      setMsgAlert("Por favor corrige los errores antes de enviar el formulario.")
      setSeverityAlert("warning")
      setOpen(true)
      return;
    }

    const response = await NoticiaService.registrarNoticiaNormal(duracion, titulo, contenido, tipo, multimedia, extension, categoriaId);
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
        <Typography variant="h3" component="h3" sx={ { fontWeight: 700 } } textAlign="center">Registro Noticia: Normal</Typography>
      </Grid>
      <CustomizedSnackbars message={msgAlert} isOpen={open} handleClose={handleClose} severity={severityAlert}/>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="titulo1" className="form-label">Ingresa título de la noticia</label>
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
                <label htmlFor="descripcion" className="form-label">Ingresa contenido de la noticia</label>
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
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  ))}
                </select>
                {errors.categoriaId && <div className="text-danger">{errors.categoriaId}</div>}
              </div>
              {/* <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Elige la fecha de la noticia</label>
                <SelecctorFechas />
              </div> */}
              <div className="mb-3">
                <label htmlFor="mediaUpload" className="form-label">Sube foto de la noticia</label>
                <input type="file" accept='.png,.jpg,.jpeg' onChange={handleImagenChange} className=""/>
                {errors.multimedia && <div className="text-danger">{errors.multimedia}</div>}
                {errors.extension && <div className="text-danger">{errors.extension}</div>}
              </div>
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
          <button type="submit" className="btn btn-primary">Crear Noticia</button>
        </form>
      </div>
    </Grid>
  );
};

export default CrearAnuncio;
