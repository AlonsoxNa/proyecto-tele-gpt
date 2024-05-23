import { noticias } from '@/assets/data/noticiasTemporal';
import { Noticia } from '@/interfaces/Noticia';
import { create } from 'zustand';

interface State {
  filtroStatus: string;
  filtroSearch: string;
  noticias: Noticia[];
}

interface Actions {
  handleChangeFiltroSearch: ( filtro: string ) => void;
  handleChangeFiltroStatus: ( filtro: string ) => void;
}

export const useFiltroSearchStore = create<State & Actions>()(
  ( set ) => ( {
    filtroSearch: '',
    noticias: noticias,
    filtroStatus: 'Todas',
    handleChangeFiltroSearch: ( filtro: string ) => {
      set( {
        filtroSearch: filtro,
        filtroStatus: 'Todas',
        noticias: noticias.filter( ( noticia ) => {
          return noticia.titulo.toLowerCase().includes( filtro.toLowerCase() );
        } )
      } );
    },
    handleChangeFiltroStatus: ( filtro ) => {
      set( {
        filtroSearch: '',
        filtroStatus: filtro,
        noticias: noticias.filter( ( noticia ) => {
          if ( filtro === 'Todas' ) {
            return noticias;
          } else if ( filtro === 'Disponibles' ) {
            return noticia.habilitado;
          } else if ( filtro === 'Ocultas' ) {
            return !noticia.habilitado;
          }
        } )
      } );
    },
  } )
);