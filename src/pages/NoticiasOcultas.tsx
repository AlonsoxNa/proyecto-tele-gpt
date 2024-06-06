import Navbar from "../Componentes/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'
import TablaSimplev2 from "../Componentes/Tablasimple/TablaSimplev2"



const NoticiasOcultas = () => {

  const handleModificarNoticia = async (id) => {
    
    try {
      let response;
      switch (tipo) {
        case 'Normal':
          //mostrar ModificarNoticiaNormal
          break;
        case 'Publicacion':
          //mostrar ModificarSolotexto
          break;
        case 'Multimedia':
          //mostrar ModificarSolofoto
          break;
        case 'Url':
          //mostrar ModificarSolovideo
          break;
        default:
          throw new Error('Tipo de noticia no soportado');
      }
    } catch (error) {
      console.error('Error al modificar la noticia', error);
    }
  };

    const datosResultadospostula = [
      {
        id:1,
        Noticia:'La flaca se comio un conejo',
        Fecha:'2024-01-12',
        BotonBorrar: {
          titulo: 'Eliminar',
          funcion: () => 
        },
        BotonOcultar: {
          titulo: 'Ocultar',
          funcion: () => {
            console.log("Ocultar")
          }
        },
        BotonModificar: {
          titulo: 'Modificar',
          funcion: () => handleModificarNoticia(id)
        },
  
      },

    ]


  return (
    <>
      <Navbar nombreUsuario="Anónimo"/>

      <div className="container">
      
      <TablaSimplev2 rows={datosResultadospostula}/>

      
      </div>
    
    </>
  )
}

export default NoticiasOcultas