
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "@/Componentes/Navbar";
import { SelecctorFechas } from "@/Componentes/SelecctorFechas";
export const Solotexto = () => {
    return (
        <>
            <Navbar nombreUsuario="Anónimo"/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="titulo1" className="form-label">Ingresa título de la publicación</label>
                            <input type="text" id="titulo1" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titulo2" className="form-label">Ingresa contenido de la publicación</label>
                            <textarea id="descripcion" className="form-control" rows={8}></textarea>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="fecha" className="form-label">Elige la fecha de la publicación</label>
                            <SelecctorFechas />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="duracion" className="form-label">Duración en pantalla (segundos)</label>
                            <input type="number" id="duracion" className="form-control" min="0" step="5" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};