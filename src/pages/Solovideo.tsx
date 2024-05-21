import MediaUpload from "../Componentes/MediaUpload";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "@/Componentes/Navbar";

export const Solovideo = () => {
    return (
        <>
            <Navbar />
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
                            <label htmlFor="mediaUpload" className="form-label">Sube el video</label>
                            <MediaUpload id="mediaUpload" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
