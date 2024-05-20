import Navbar from "../Componentes/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'
import TablaSimplev2 from "../Componentes/Tablasimple/TablaSimplev2"



const NoticiasOcultas = () => {


    const datosResultadospostula = [
      {
        id:1,
        Noticia:'La flaca se comio un conejo',
        Fecha:'2024-01-12',
        BotonBorrar: {
          titulo: 'Eliminar',
          funcion: () => {
            console.log("Eliminar")
          }
        },
        BotonOcultar: {
          titulo: 'Ocultar',
          funcion: () => {
            console.log("Ocultar")
          }
        },
        BotonModificar: {
          titulo: 'Modificar',
          funcion: () => {
            console.log("Modificar ")
          }
        },
  
      },
  
      {
        id:2,
        Noticia:'El fin del mundo ya esta cerca, todos vamos a morir  ',
        Fecha:'2024-01-12',
        BotonBorrar: {
          titulo: 'Eliminar',
          funcion: () => {
            console.log("Eliminar")
          }
        },
        BotonOcultar: {
          titulo: 'Ocultar',
          funcion: () => {
            console.log("Ocultar")
          }
        },
        BotonModificar: {
          titulo: 'Modificar',
          funcion: () => {
            console.log("Modificar ")
          }
        },
  
      },
  
      {
        id:3,
        Noticia:'Ahora hay energia infinita, nuevo descubrimiento',
        Fecha:'2024-01-12',
        BotonBorrar: {
          titulo: 'Eliminar',
          funcion: () => {
            console.log("Eliminar")
          }
        },
        BotonOcultar: {
          titulo: 'Ocultar',
          funcion: () => {
            console.log("Ocultar")
          }
        },
        BotonModificar: {
          titulo: 'Modificar',
          funcion: () => {
            console.log("Modificar ")
          }
        },
  
      },
      
      {
        id:3,
        Noticia:'Esta noticia no estaba antes',
        Fecha:'2024-01-12',
        BotonBorrar: {
          titulo: 'Eliminar',
          funcion: () => {
            console.log("Eliminar")
          }
        },
        BotonOcultar: {
          titulo: 'Mostrar',
          funcion: () => {
            console.log("Ocultar")
          }
        },
        BotonModificar: {
          titulo: 'Modificar',
          funcion: () => {
            console.log("Modificar ")
          }
        },
  
      },
  
      {
        id:3,
        Noticia:'Jaja saludos a todos, uwu jijija',
        Fecha:'2024-01-12',
        BotonBorrar: {
          titulo: 'Eliminar',
          funcion: () => {
            console.log("Eliminar")
          }
        },
        BotonOcultar: {
          titulo: 'Mostrar',
          funcion: () => {
            console.log("Ocultar")
          }
        },
        BotonModificar: {
          titulo: 'Modificar',
          funcion: () => {
            console.log("Modificar ")
          }
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