import Image1 from '@/assets/publicacion2.jpg';
import Image2 from '@/assets/publicacion3.jpg';
import Image3 from '@/assets/slider-03.webp';
import { useEffect,useRef } from 'react';
import Video1 from '@/assets/publicacion1.mp4';
import { CarruselItem } from './CarruselItem';
import "./Carrusel.css"

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

declare global {
  interface Window {
    bootstrap: any;
  }
}

export const Carrusel = () => {

  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselItem = useRef<HTMLDivElement>(null);
  const buttonItemNext = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    const timer = setTimeout(() => {
      if (buttonItemNext.current) {
        buttonItemNext.current.click();
      }
    }, 9000);
  },[])

  return (
    <div className="w-full">
      <div ref={carouselRef} data-bs-interval="false" id="carouselExampleCaptions" className="carousel slide carousel-container" data-bs-ride="carousel">
        <div className="carousel-inner">
          {
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
        <h1 className='text-center'>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
        </h1>
      </div>
    </div>
  );
};