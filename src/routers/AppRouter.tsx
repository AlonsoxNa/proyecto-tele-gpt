import { createBrowserRouter } from "react-router-dom";
import  Login  from '../pages/Login';
import { CrearAnuncio } from '../pages/CrearAnuncio';
import { Solofoto } from '../pages/Solofoto';
import { Solovideo } from '../pages/Solovideo';
import { Solotexto } from '../pages/Solotexto';
import  Ayuda  from '../pages/Ayuda';
import { Dashboard } from '../pages/Dashboard';
import { Slider } from '../pages/Slider';
import NoticiasOcultas from "../pages/NoticiasOcultas";

export const router = createBrowserRouter( [
  /*{
    path: "/",
    element: <Login />,
  },
  */
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
    path: '/',
    element: <Slider />
  },
  {
    path: "/Ayuda",
    element: <Ayuda />,
  },
  {
    path: '/NoticiasOcultas',
    element: <NoticiasOcultas/>
  }
] );