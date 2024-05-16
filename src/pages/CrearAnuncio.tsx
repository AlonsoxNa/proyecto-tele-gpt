import MediaUpload from "../Componentes/MediaUpload";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "@/Componentes/Navbar";
import { SelecctorFechas } from "@/Componentes/SelecctorFechas";

export const CrearAnuncio = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="titulo1" className="form-label">Ingresa título de la noticia</label>
                            <input type="text" id="titulo1" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titulo2" className="form-label">Ingresa contenido de la noticia</label>
                            <textarea id="descripcion" className="form-control" rows="8"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titulo3" className="form-label">Ingresa categoria</label>
                            <input type="text" id="titulo3" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="fecha" className="form-label">Elige la fecha de la noticia</label>
                            <SelecctorFechas id="fecha" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mediaUpload" className="form-label">Sube foto o video de la noticia</label>
                            <MediaUpload id="mediaUpload" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
