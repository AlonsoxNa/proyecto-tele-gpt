import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/Componentes/Navbar";
import { SelecctorFechas } from "@/Componentes/SelecctorFechas";
import MediaUpload from "../Componentes/MediaUpload";
import NoticiaService from "../services/Noticias";
import CategoriaService from "@/services/CategoriaService";

const CrearAnuncio = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [duracion, setDuracion] = useState(0);
  const [multimedia, setMultimedia] = useState("");
  const [extension, setExtension] = useState("");
  const [multimediaUrl, setMultimediaUrl] = useState("");
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
      case "contenido":
        if (!value) {
          error = "El contenido es obligatorio";
        } else if (value.length < 5) {
          error = "El contenido debe tener un mínimo de 5 caracteres";
        } else if (value.length > 1024) {
          error = "El contenido debe tener un máximo de 1024 caracteres";
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

  const handleTituloChange = (e) => {
    const value = e.target.value;
    setTitulo(value);
    validateField("titulo", value);
  };

  const handleContenidoChange = (e) => {
    const value = e.target.value;
    setContenido(value);
    validateField("contenido", value);
  };

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    setCategoriaId(value);
    validateField("categoriaId", value);
  };

  const handleDuracionChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setDuracion(value);
    validateField("duracion", value);
  };

  const handleImagenChange = (event) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tipo = "Normal";
    const data = {
      duracion,
      titulo,
      contenido,
      tipo,
      multimedia,
      extension,
      categoriaId
    };
    
    validateField("titulo", titulo);
    validateField("contenido", contenido);
    validateField("categoriaId", categoriaId);
    validateField("duracion", duracion);
    validateField("multimedia", multimedia);
    validateField("extension", extension);

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      alert("Por favor corrige los errores antes de enviar el formulario.");
      return;
    }

    let response = await NoticiaService.registrarNoticiaNormal(duracion, titulo, contenido, tipo, multimedia, extension, categoriaId);
    if (response) {
      alert("Noticia registrada correctamente.");
    } else {
      alert("Error al registrar la noticia.");
    }
  };

  return (
    <>
      <Navbar nombreUsuario="Anonimo" />
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
                <label htmlFor="fecha" className="form-label">Elige la fecha de la noticia</label>
                <SelecctorFechas />
              </div>
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
    </>
  );
};

export default CrearAnuncio;
