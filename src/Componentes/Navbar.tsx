import 'bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
import { Link } from 'react-router-dom';

interface Navbar{
  nombreUsuario:string;
}


const Navbar = ({ nombreUsuario = 'Anonimo' }:Navbar ) => {

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
    
              <div
                className='collapse navbar-collapse'
                id='navbarNavAltMarkup'
              >

                

                {/* <div className='navbar-nav'>{children}</div> */}
                <div className='container'>
                    <div className='row'>
                        <div className='col-2'>
                        <Link className='navtext' to={'/admin'}>Noticias Mostradas</Link>
                        </div>

                        <div className='col-2'>
                        <Link className='navtext' to={'/NoticiasOcultas'}>Noticias archivadas</Link>
                        </div>

                        <div className='col-2'>
                        <Link className='navtext' to={'/crear-anuncio'}>Crear noticias</Link>
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
      )
  
}

export default Navbar