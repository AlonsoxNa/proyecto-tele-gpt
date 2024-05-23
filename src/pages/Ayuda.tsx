import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/Componentes/Navbar";



const Ayuda = () => {
    return (
        <>
            <Navbar nombreUsuario="Anónimo" />
            <div className="container mt-4">
                <h1>Modo de uso</h1>
                <div className="mb-4">
                    <div className="ratio ratio-16x9">
                        <iframe 
                            src="https://www.youtube.com/watch?v=bo9Z_pgByQY" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
                <h2>Manual de uso</h2>
                <div className="mt-3">
                    <p>
                        Bienvenido al tutorial de uso. A continuación, te guiaremos a través de los pasos necesarios para utilizar nuestra aplicación:
                    </p>
                    <ol>
                        <li>Inicio de sesión: Ingrese sus credenciales para acceder a la plataforma.</li>
                        <li>Crear elemento: Utilice el menú de navegación para crear diferentes tipos de contenido, como fotos, videos, publicaciones y noticias.</li>
                        <li>Subir contenido: En la sección correspondiente, suba el contenido deseado utilizando el formulario proporcionado.</li>
                        <li>Configurar duración: Para fotos y videos, configure la duración en pantalla según sus necesidades.</li>
                        <li>Guardar y publicar: Asegúrese de guardar sus cambios y publicar el contenido para que sea visible en la plataforma.</li>
                        <li>Ayuda adicional: Si necesita más asistencia, visite esta sección de Ayuda o contacte a nuestro soporte técnico.</li>
                    </ol>
                    <p>
                        Esperamos que este tutorial haya sido de ayuda. Si tiene alguna otra pregunta, no dude en consultarnos.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Ayuda;
