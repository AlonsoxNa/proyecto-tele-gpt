import { useEffect,useRef, useState } from 'react';
import NoticiaService from '@/services/Noticias';
import "./Carrusel.css";
import CintaNoticas from '../cinta/CintaNoticias';

interface Noticia {
  categoriaId:string,
  contenido:string|null,
  fechaRegistro:Date,
  habilitado:boolean,
  id:string,
  multimedia:string|undefined,
  multimedia_url:string|undefined,
  extension:string|null,
  tipo:string,
  titulo:string,
  duracion:number
}

const noticia_vacia = {
  categoriaId:"",
  contenido:"",
  fechaRegistro:new Date(),
  habilitado:true,
  id:"",
  multimedia:"",
  multimedia_url:"",
  extension:"",
  tipo:"",
  titulo:"",
  duracion:3
}

declare global {
  interface Window {
    bootstrap: any;
  }
}

export const Carrusel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselItem = useRef<HTMLDivElement>(null);
  const buttonItemNext = useRef<HTMLButtonElement>(null);
  const [noticias,setNoticias] = useState<Noticia[]>([noticia_vacia])

  const obtenerNoticias = async () => {
    const respuesta = await NoticiaService.obtenerNoticiasMostradas()
    if (respuesta){
      setNoticias(respuesta)
    }
  }

  const getYouTubeEmbedUrl = (url:string|undefined) => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    if (url){
      const match = url.match(youtubeRegex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&controls=0&playlist=${match[1]}`;
      }
    }
    return '';
  };

  const getDuracion = (segundos:number) => {
    return String(segundos*1000)
  }
  const timer = () => {
    if (buttonItemNext.current) {
      buttonItemNext.current.click();
      //console.log("btn sgte")
    }
  };
  timer();
  useEffect(()=>{
    obtenerNoticias()
  },[])
  useEffect(()=>{
    const timer = () => {
      return setTimeout(() => {
        obtenerNoticias()       //obtengo noticias actualizadas cada 1 hora
      }, 60*60*1000);
    };
    // Iniciar el temporizador cuando el componente se monte
    timer();
  },[])

  useEffect(() => {
    const handleSlide = () => {
      if (carouselRef.current){
        const items = carouselRef.current.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
          const iframe = item.querySelector('iframe');
          if (iframe) {
            if (item.classList.contains('active')) {
              // Agregar autoplay al iframe del slide activo
              const src = iframe.getAttribute('src');
              if (src && !src.includes('autoplay=1')){
                iframe.setAttribute('src', `${src}${src.includes('?') ? '&' : '?'}autoplay=1`);
                //console.log("agrega el autoplay")
              }
              
            } else {
              // Remover autoplay del iframe de slides inactivos
              const src = iframe.getAttribute('src');
              if (src){
                iframe.setAttribute('src', src.replace('autoplay=1', ''));
                //console.log("remueve el autoplay")
              }
            }
          }
        });
      }
      
    };
    if (carouselRef.current){
      // Agregar evento al cambiar slide
      carouselRef.current.addEventListener('slid.bs.carousel', handleSlide);
  
      // Limpiar evento al desmontar el componente
      return () => {
        if (carouselRef.current){
          carouselRef.current.removeEventListener('slid.bs.carousel', handleSlide);
        }
      };

    }
  }, []);

  return (
    <div className="w-100 h-100">
      {
        noticias.length==0?
        <>
          <h1>No hay noticias por mostrar</h1>
        </>
        :
        <>
          <div ref={carouselRef} data-bs-interval="false" id="carouselExampleCaptions" className="carousel slide carousel-container" data-bs-ride="carousel">
            <div className="carousel-inner">
              {
                noticias.map((noticia,index)=>(
                  <>
                    <div key={index} ref={carouselItem}// Añadir un key único para cada elemento del mapa
                      className={`carousel-item${index === 0 ? ' active' : ''}`} // Clase condicional para el primer elemento
                      data-bs-interval={getDuracion(noticia.duracion)}>
                        <div className="carousel-container">
                          {
                            noticia.tipo=="Normal" || noticia.tipo=="Multimedia"?
                            <>
                                {/* <div className="bg-image" style={{ backgroundImage: `url(${noticia.multimedia})` }}></div> */}
                                <div className="bg-image" style={{ backgroundImage: `url(data:image/${noticia.extension};base64,${noticia.multimedia})` }}></div>
                                <div className="carousel-container justify-content-center d-flex">
                                    <>
                                      <img src={`data:image/${noticia.extension};base64, ${noticia.multimedia}`}  alt="" className="d-block h-100 z-2" />
                                    </>
                                </div>
                                <div className="carousel-content">
                                    <span className="titulo-publicacion">{noticia.titulo}</span>
                                </div>
                            </>
                            :noticia.tipo=="Publicacion"?
                            <>
                              <div className="carousel-container">
                                <div className="bg-image" style={{ backgroundImage: `url(/src/assets/logo.png)`,backgroundColor:"gray" }}></div>
                                <div className='box-publicacion-contenido'>
                                  <p className=''>
                                    {
                                      noticia.contenido
                                    }
                                  </p>
                                  
                                </div>
                                <div className="content-publicacion">
                                    <span className="titulo-publicacion-publicacion">{noticia.titulo}</span>
                                </div>
                              </div>
                            </>
                            :
                            //es url
                            <>
                                <div className="bg-image" style={{ backgroundImage: `url(${noticia.multimedia})` }}></div>
                                <div className="carousel-container justify-content-center d-flex">
                                  {
                                      <iframe
                                        width={"100%"}
                                        // height="315"
                                        src={getYouTubeEmbedUrl(noticia.multimedia_url)}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="YouTube video"
                                      ></iframe>
                                  }
                                </div>
                                <div className="carousel-content">
                                    <span className="titulo-publicacion">{noticia.titulo}</span>
                                </div>
                            </>
                          }
                        </div>
                    </div>
                  </>
                ))
              }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button ref={buttonItemNext} className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </>
        }
      
    </div>
  );
};