import Image1 from '@/assets/publicacion2.jpg';
import Image2 from '@/assets/publicacion3.jpg';
import Image3 from '@/assets/slider-03.webp';
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

export const Carrusel = () => {
  return (
    <div className="w-full">
      <div id="carouselExampleCaptions" className="carousel slide carousel-container" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="9000">
            <CarruselItem type={itemSlider[0].type} image={ itemSlider[0].multimedia } label={ itemSlider[0].label } text={ itemSlider[0].text } />
          </div>
          <div className="carousel-item" data-bs-interval="9000">
            <CarruselItem type={itemSlider[1].type} image={ itemSlider[1].multimedia} label={ itemSlider[1].label } text={ itemSlider[1].text } />
          </div>
          <div className="carousel-item" data-bs-interval="9000">
            <CarruselItem type={itemSlider[2].type} image={ itemSlider[2].multimedia } label={ itemSlider[2].label } text={ itemSlider[2].text } />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='w-full descripcion-container justify-content-center flex'>
        <h1 className='text-center'>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.
        </h1>
      </div>
    </div>
  );
};