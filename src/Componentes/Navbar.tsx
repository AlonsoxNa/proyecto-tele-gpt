import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ children, nombreUsuario = 'Anonimo' }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <nav className='navbar navbar-expand-lg custom-navbar-color'>
                <div className='container-fluid'>
                    <button
                        className='navbar-toggler'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNavAltMarkup'
                        aria-controls='navbarNavAltMarkup'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon' />
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>{children}</div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-2'>
                                    <Link className='navtext' to={'/admin'}>Elementos Mostrados</Link>
                                </div>

                                <div className='col-2'>
                                    <Link className='navtext' to={'/NoticiasOcultas'}>Elementos archivados</Link>
                                </div>

                                <div className='col-2'>
                                    <div className='nav-item dropdown'>
                                        <a
                                            className='nav-link dropdown-toggle navtext'
                                            href='#'
                                            id='crearElementoDropdown'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Crear elemento
                                        </a>
                                        <ul className='dropdown-menu' aria-labelledby='crearElementoDropdown'>
                                            <li>
                                                <Link className='dropdown-item' to={'/Solofoto'}>Solo foto</Link>
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' to={'/Solovideo'}>Solo video</Link>
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' to={'/Solotexto'}>Publicación</Link>
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' to={'/crear-anuncio'}>Noticia</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='col-2'>
                                    <Link className='navtext' to={'/Ayuda'}>Ayuda</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <div className='container'>
                            <div className='row colorTexto'>Bienvenido</div>
                            <div className='row colorTextoGris'>
                                {nombreUsuario}
                            </div>
                        </div>
                    </div>
                    <div className='iconoperfil' />
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
