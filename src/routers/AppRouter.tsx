import { Navigate, createBrowserRouter } from "react-router-dom";
import { HomeTemporal } from '../pages/HomeTemporal';
import CrearAnuncio from '../pages/CrearAnuncio';
import Solofoto from '../pages/Solofoto';
import Solovideo from '../pages/Solovideo';
import Solotexto from '../pages/Solotexto';
//import { Dashboard } from '../pages/Dashboard';
import  Ayuda  from '../pages/Ayuda';
import { Noticias } from '../pages/Noticias';
import { Slider } from '../pages/Slider';
import NoticiasOcultas from "../pages/NoticiasOcultas";
import { Login } from '@/pages/Login';
import { Layout } from '@/components/layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import ModificarNoticiaNormal from "@/pages/ModificarNoticiaNormal";
import ModificarSolofoto from "@/pages/ModificarSolofoto";
import ModificarSolovideo from "@/pages/ModificarSolovideo";
import ModificarSolotexto from "@/pages/ModificarSolotexto";
import NotFound from "@/pages/NotFound";
import { PublicRoute } from "./PublicRoute";

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
      }
      ,{
        path: "Ayuda",
        element: <Ayuda />,
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
  }
] );