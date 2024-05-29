import { Noticia } from '@/interfaces/Noticia';
import { getNoticiasAPI } from '@/services/noticiasService';
import { create } from 'zustand';

interface State {
  filtroStatus: string;
  filtroSearch: string;
  noticias: Noticia[];
  noticiasFiltradas: Noticia[];
}

interface Actions {
  handleChangeFiltroSearch: ( filtro: string ) => void;
  handleChangeFiltroStatus: ( filtro: string ) => void;
  fetchNoticias: () => void;
}

export const useNoticiasStore = create<State & Actions>()(
  ( set ) => ( {
    filtroSearch: '',
    noticias: [],
    noticiasFiltradas: [],
    filtroStatus: 'Todas',
    handleChangeFiltroSearch: ( filtro: string ) => {
      set( state => ( {
        filtroSearch: filtro,
        filtroStatus: 'Todas',
        noticiasFiltradas: state.noticias.filter( ( noticia ) => {
          return noticia.titulo.toLowerCase().includes( filtro.toLowerCase() );
        } )
      } ) );
    },
    handleChangeFiltroStatus: ( filtro ) => {
      set( state => ( {
        filtroSearch: '',
        filtroStatus: filtro,
        noticiasFiltradas: state.noticias.filter( ( noticia ) => {
          if ( filtro === 'Todas' ) {
            return state.noticias;
          } else if ( filtro === 'Disponibles' ) {
            return noticia.habilitado;
          } else if ( filtro === 'Ocultas' ) {
            return !noticia.habilitado;
          }
        } )
      } ) );
    },
    fetchNoticias: async () => {
      const response = await getNoticiasAPI();
      set( {
        noticias: response,
        noticiasFiltradas: response
      } );
    }
  } )
);