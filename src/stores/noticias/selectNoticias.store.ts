import { Noticia } from '@/interfaces/Noticia';
import { create } from 'zustand';

interface State {
  noticiasSelected: Noticia[];
}

interface Actions {
  handleAddNoticia: ( noticia: Noticia ) => void;
}

export const useSelectNoticias = create<State & Actions>()(
  ( set ) => ( {
    noticiasSelected: [],
    handleAddNoticia: ( noticia: Noticia ) => {
      set( ( state ) => ( {
        noticiasSelected: state.noticiasSelected.includes( noticia )
          ? state.noticiasSelected.filter( ( item ) => item !== noticia )
          : [ ...state.noticiasSelected, noticia ]
      } ) );
    },
  } )
);