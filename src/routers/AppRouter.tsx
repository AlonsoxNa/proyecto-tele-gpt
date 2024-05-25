import { createBrowserRouter } from "react-router-dom";
import { HomeTemporal } from '../pages/HomeTemporal';
import { CrearAnuncio } from '../pages/CrearAnuncio';
import { Solofoto } from '../pages/Solofoto';
import { Solovideo } from '../pages/Solovideo';
import { Solotexto } from '../pages/Solotexto';
import  Ayuda  from '../pages/Ayuda';
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
    path: "/Solofoto",
    element: <Solofoto />,
  },
  {
    path: "/Solovideo",
    element: <Solovideo />,
  },
  {
    path: "/Solotexto",
    element: <Solotexto />,
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
    path: "/Ayuda",
    element: <Ayuda />,
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