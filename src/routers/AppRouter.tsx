import { createBrowserRouter } from "react-router-dom";
import { HomeTemporal } from '../pages/HomeTemporal';
import { CrearAnuncio } from '../pages/CrearAnuncio';
import { Dashboard } from '../pages/Dashboard';
import { Slider } from '../pages/Slider';
import NoticiasOcultas from "../pages/NoticiasOcultas";
import { Login } from '@/pages/Login';

export const router = createBrowserRouter( [
  {
    path: "/home",
    element: <HomeTemporal />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/crear-anuncio",
    element: <CrearAnuncio />,
  },
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: '/slider',
    element: <Slider />
  },
  {
    path: '/NoticiasOcultas',
    element: <NoticiasOcultas />
  },
  {
    path: "/*",
    element: <Login />,
  },
] );