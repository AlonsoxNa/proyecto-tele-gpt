import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <>
      {/* Por ahora están estos botones, después obviamente hay que colocar el login */ }
      <div className="d-flex justify-content-center align-items-center gap-4 vh-100">
        <Link className="btn btn-primary" to="/crear-anuncio">Ir a crear anuncio</Link>
        <Link className="btn btn-primary" to="/slider" >Ir a slider</Link>
        <Link className="btn btn-primary" to="/dashboard" >Ir a Configurar anuncios</Link>
      </div>
    </>
  );
};