import { createBrowserRouter } from "react-router-dom";
import { HomeTemporal } from '../pages/HomeTemporal';
import { CrearAnuncio } from '../pages/CrearAnuncio';
import { Dashboard } from '../pages/Dashboard';
import { Slider } from '../pages/Slider';
import NoticiasOcultas from "../pages/NoticiasOcultas";
import { Login } from '@/pages/Login';
import { Layout } from '@/components/layout/Layout';
import { PrivateRoute } from './PrivateRoute';

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
    path: "/admin/",
    element: <PrivateRoute>
      <Layout />
    </PrivateRoute>,
    children: [
      {
        path: "noticias",
        element: <Noticias />,
      },
    ]
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