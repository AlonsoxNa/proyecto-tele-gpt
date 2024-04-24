import { createBrowserRouter } from "react-router-dom";
import { Login } from '../pages/Login';
import { CrearAnuncio } from '../pages/CrearAnuncio';
import { Dashboard } from '../pages/Dashboard';
import { Slider } from '../pages/Slider';

export const router = createBrowserRouter( [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/crear-anuncio",
    element: <CrearAnuncio />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: '/slider',
    element: <Slider />
  }
] );