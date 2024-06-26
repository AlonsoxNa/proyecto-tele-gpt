//import { Dashboard } from '../pages/Dashboard';
import  Ayuda  from '../pages/Ayuda';
import { Layout } from '@/components/layout/Layout';
import { Login } from '@/pages/Login';
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Noticias } from '../pages/Noticias';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from "./PublicRoute";
import { Slider } from '../pages/Slider';
import CrearAnuncio from '../pages/CrearAnuncio';
import ModificarNoticiaNormal from "@/pages/ModificarNoticiaNormal";
import ModificarSolofoto from "@/pages/ModificarSolofoto";
import ModificarSolotexto from "@/pages/ModificarSolotexto";
import ModificarSolovideo from "@/pages/ModificarSolovideo";
import NotFound from "@/pages/NotFound";
import Solofoto from '../pages/Solofoto';
import Solotexto from '../pages/Solotexto';
import Solovideo from '../pages/Solovideo';
import CrearCategoría from '@/pages/categoria/CrearCategoría';
import GestionCategoria from '@/pages/categoria/GestionCategoria';

export const router = createBrowserRouter( [
  {
    path: "/login",
    element: <PublicRoute> <Login /> </PublicRoute> 
  },
  {
    path: "/admin/",
    element: <PrivateRoute> <Layout /> </PrivateRoute>,
    children: [
      {
        path: "noticias",
        element: <Noticias />,
      },
      {
        path: "crear-anuncio",
        element: <CrearAnuncio />,
      },
      {
        path: "Solofoto",
        element: <Solofoto />,
      },
      {
        path: "Solovideo",
        element: <Solovideo />,
      },
      {
        path: "Solotexto",
        element: <Solotexto />,
      },{
        path: "modificar-normal",
        element: <ModificarNoticiaNormal />,
      },{
        path: "modificar-foto",
        element: <ModificarSolofoto />,
      },{
        path: "modificar-video",
        element: <ModificarSolovideo />,
      },{
        path: "modificar-texto",
        element: <ModificarSolotexto />,
      },{
        path: "Ayuda",
        element: <Ayuda />,
      },{
        path: "crear-categoria",
        element: <CrearCategoría />,
      },{
        path: "gestion-categoria",
        element: <GestionCategoria />,
      }
    ]
  },
  {
    path: '/slider',
    element: <Slider />
  },
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/",
    element: <Navigate to="/login" />
  }
] );