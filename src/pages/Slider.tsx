import { Carrusel } from '../components/slider/Carrusel';
import {NavbarInicio} from '../components/slider/NavbarInicio';

interface Slide{
  type: 'image' | 'video';
  src: string;
  duration: number
}

export const Slider = () => {
  return (
    <div className="container-slider h-full">
      <NavbarInicio />
      <Carrusel />
      {/* <Carrusel2  slides={slides}/> */}
    </div>
  );
};