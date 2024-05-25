import Image1 from '@/assets/publicacion2.jpg';
import Image2 from '@/assets/publicacion3.jpg';
import { useEffect,useRef, useState } from 'react';
import Video1 from '@/assets/publicacion1.mp4';
import "./Carrusel.css";

import NoticiaService from '@/services/Noticias';
import { set } from 'date-fns';

const itemSlider = [
  {
    multimedia: Image1,
    label: 'Titulo de la notica 1, prueba de cuanto deberia tener de largo1',
    type: 'image',
    text: 'Titulo de la notica 1, prueba de cuanto deberia tener de largo'
  },
  {
    multimedia: Image2,
    label: 'Titulo de la notica 2, prueba de cuanto deberia tener de largo2',
    type: 'image',
    text: 'Soy un texto 2'
  },
  {
    multimedia: Video1,
    label: 'Titulo de la notica 3, prueba de cuanto deberia tener de largo3',
    type: 'video',
    text: 'Soy un texto video 1'
  }
  //TAMBIEN DEBERIA RECIBIR LA DURACION DEL VIDEO PARA SETEAR ESTE
];

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

  useEffect(()=>{
    const timer = () => {
      return setTimeout(() => {
        if (buttonItemNext.current) {
          buttonItemNext.current.click();
        }
      }, 9000);
    };
    // Iniciar el temporizador cuando el componente se monte
    timer();
    obtenerNoticias()
  },[])

  const obtenerNoticias = async () => {
    const respuesta = await NoticiaService.obtenerNoticiasMostradas()
    //console.log(respuesta)
    if (respuesta){
      setNoticias(respuesta)
    }
  }

  const getYouTubeEmbedUrl = (url:string|undefined) => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    if (url){
      const match = url.match(youtubeRegex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}`;
      }
    }
    return '';
  };

  const getDuracion = (segundos:number) => {
    return String(segundos*1000)
  }

  return (
    <div className="w-full">
      <div ref={carouselRef} data-bs-interval="false" id="carouselExampleCaptions" className="carousel slide carousel-container" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* {
            itemSlider.map((item,index)=>(
              <div key={index} ref={carouselItem}// Añadir un key único para cada elemento del mapa
              className={`carousel-item${index === 0 ? ' active' : ''}`} // Clase condicional para el primer elemento
              data-bs-interval="9000">
                <div className="carousel-container">
                {
                  item.type === 'video'?
                  <>
                    <div className="bg-image" style={{ backgroundImage: `url(/src/assets/logo.png)`,backgroundColor:"gray" }}></div>
                  </>
                  :<></>
                }
                <div className="bg-image" style={{ backgroundImage: `url(${item.multimedia})` }}></div>
                <div className="carousel-container justify-content-center d-flex">
                    {item.type === 'video' && (
                        <video id={`video-${item.label}`} controls loop muted autoPlay className="z-2" >
                              <source src={item.multimedia} type="video/mp4" />
                          </video> 
                    )}
                    {item.type === 'image' && (
                        <img src={item.multimedia}  alt="" className="d-block h-100 z-2" />
                        )}
                </div>
                <div className="carousel-content">
                    <span className="titulo-publicacion">{item.label}</span>
                  </div>
                </div>
              </div>
            ))
          } */}
          {
            noticias.map((noticia,index)=>(
              <div key={index} ref={carouselItem}// Añadir un key único para cada elemento del mapa
                className={`carousel-item${index === 0 ? ' active' : ''}`} // Clase condicional para el primer elemento
                data-bs-interval={getDuracion(noticia.duracion)}>
                  <div className="carousel-container">
                    {
                      noticia.tipo=="Normal" || noticia.tipo=="Multimedia"?
                      <>
                          {
                            noticia.extension === 'mp4'?
                            <>
                              <div className="bg-image" style={{ backgroundImage: `url(/src/assets/logo.png)`,backgroundColor:"gray" }}></div>
                            </>
                            :<></>
                          }
                          <div className="bg-image" style={{ backgroundImage: `url(${noticia.multimedia})` }}></div>
                          <div className="carousel-container justify-content-center d-flex">
                            {
                              noticia.extension === 'mp4'?
                              <>
                                <video id={`video-${noticia.titulo}`} controls loop muted autoPlay className="z-2">
                                  <source src={`data:video/${noticia.extension};base64,${noticia.multimedia}`} type={`video/${noticia.extension}`} />
                                </video>
                              </>
                              :
                              <>
                                <img src={`data:image/${noticia.extension};base64, ${noticia.multimedia}`}  alt="" className="d-block h-100 z-2" />
                              </>
                            }
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
                        {
                            noticia.extension === 'mp4'?
                            <>
                              <div className="bg-image" style={{ backgroundImage: `url(/src/assets/logo.png)`,backgroundColor:"gray" }}></div>
                            </>
                            :<></>
                          }
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
      <div className='w-full descripcion-container justify-content-center flex'>
        {/* <h1 className='text-center'>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
        </h1> */}
      </div>
    </div>
  );
};