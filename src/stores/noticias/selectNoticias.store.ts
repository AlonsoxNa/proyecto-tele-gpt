import { Noticia } from '@/interfaces/Noticia';
import { create } from 'zustand';

interface State {
  noticiasSelected: string[];
}

interface Actions {
  handleAddNoticia: ( noticia: Noticia ) => void;
  handleAddAll: ( noticias: Noticia[] ) => void;
  handleClear: () => void;
}

export const useSelectNoticias = create<State & Actions>()(
  ( set ) => ( {
    noticiasSelected: [],
    handleAddNoticia: ( noticia: Noticia ) => {
      set( ( state ) => ( {
        noticiasSelected: state.noticiasSelected.includes( noticia.id )
          ? state.noticiasSelected.filter( ( item ) => item !== noticia.id )
          : [ ...state.noticiasSelected, noticia.id ]
      } ) );
    },
    handleAddAll( noticias: Noticia[] ) {
      set( {
        noticiasSelected: noticias.map( ( noticia ) => noticia.id )
      } );
    },
    handleClear: () => {
      set( {
        noticiasSelected: []
      } );
    }
  } )
);