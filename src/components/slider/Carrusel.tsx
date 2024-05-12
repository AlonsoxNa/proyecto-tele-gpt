import Image1 from '@/assets/slider-01.avif';
import Image2 from '@/assets/slider-02.jpg';
import Image3 from '@/assets/slider-03.webp';
import { CarruselItem } from './CarruselItem';


const itemSlider = [
  {
    image: Image1,
    label: 'Soy una descripción 1',
    text: 'Soy un texto 1'
  },
  {
    image: Image2,
    label: 'Soy una descripción 2',
    text: 'Soy un texto 2'
  },
  {
    image: Image3,
    label: 'Soy una descripción 3',
    text: 'Soy un texto 3'
  }
];

export const Carrusel = () => {
  return (
    <div className="container">
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <CarruselItem image={ itemSlider[ 0 ].image } label={ itemSlider[ 0 ].label } text={ itemSlider[ 0 ].text } />
          <CarruselItem image={ itemSlider[ 1 ].image } label={ itemSlider[ 1 ].label } text={ itemSlider[ 1 ].text } />
          <CarruselItem image={ itemSlider[ 2 ].image } label={ itemSlider[ 2 ].label } text={ itemSlider[ 2 ].text } />
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


    </div>
  );
};