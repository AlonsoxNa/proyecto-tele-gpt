import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/Componentes/Navbar";
import MediaUpload from "../Componentes/MediaUpload";
import NoticiaService from "../services/Noticias";
import CategoriaService from "@/services/CategoriaService";

const Solovideo = () => {
  const [titulo, setTitulo] = useState("");
  const [multimediaUrl, setMultimediaUrl] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      //const response = await axios.get(`${API_URL}/categorias`);
      const response = await CategoriaService.obtenerCategorias()
      setCategorias(response);
    };
    fetchCategorias();
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
      case "multimediaUrl":
        if (!value) {
          error = "El URL del video es obligatorio";
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

  const handleTituloChange = (e) => {
    const value = e.target.value;
    setTitulo(value);
    validateField("titulo", value);
  };

  const handleMultimediaUrlChange = (url) => {
    setMultimediaUrl(url);
    validateField("multimediaUrl", url);
  };

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    setCategoriaId(value);
    validateField("categoriaId", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tipo = "Url";

    // Validate all fields before submitting
    validateField("titulo", titulo);
    validateField("multimediaUrl", multimediaUrl);
    validateField("categoriaId", categoriaId);

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      alert("Por favor corrige los errores antes de enviar el formulario.");
      return;
    }

    let response = await NoticiaService.registrarNoticiaVideo(duracion, titulo, tipo, multimediaUrl, categoriaId);
    if (response) {
      alert("Noticia video registrada correctamente.");
    } else {
      alert("Error al registrar la noticia video.");
    }
  };

  return (
    <>
      <Navbar nombreUsuario="Anónimo" />
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
                <label htmlFor="mediaUpload" className="form-label">Sube el video</label>
                <MediaUpload onUrlChange={handleMultimediaUrlChange} />
                {errors.multimediaUrl && <div className="text-danger">{errors.multimediaUrl}</div>}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Crear Noticia Video</button>
        </form>
      </div>
    </>
  );
};

export default Solovideo;
