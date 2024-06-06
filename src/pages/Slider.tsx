import CintaNoticas from '@/components/cinta/CintaNoticias';
import { Carrusel } from '../components/slider/Carrusel';
import {NavbarInicio} from '../components/slider/NavbarInicio';

export const Slider = () => {
  return (
    <div className="container-slider h-full">
      <NavbarInicio />
      <Carrusel />
      <CintaNoticas />
    </div>
  );
};