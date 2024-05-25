import MediaUpload from "../Componentes/MediaUpload";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "@/Componentes/Navbar";

export const Solofoto = () => {
    return (
        <>
            <Navbar nombreUsuario="Anónimo" />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="titulo1" className="form-label">Ingresa título</label>
                            <input type="text" id="titulo1" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="duracion" className="form-label">Duración en pantalla (segundos)</label>
                            <input type="number" id="duracion" className="form-control" min="0" step="5" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mediaUpload" className="form-label">Sube la foto</label>
                            <MediaUpload  />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
