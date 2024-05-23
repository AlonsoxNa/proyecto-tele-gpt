import { Noticia } from '@/interfaces/Noticia';
import { useFiltroStore } from '@/stores/noticias/filtro.store';
import { useCallback, useEffect, useState } from 'react';

export const useFilterNoticias = ( items: Noticia[] ) => {

  const { filtroSearch, handleChangeFiltro } = useFiltroStore();
  const [ noticiasFiltradas, setNoticiasFiltradas ] = useState<Noticia[]>( items );

  const filtrarNoticias = useCallback( ( filtro: string ) => {
    const noticiasFiltradas = items.filter( ( noticia ) => {
      return noticia.titulo.toLowerCase().includes( filtro.toLowerCase() );
    } );

    setNoticiasFiltradas( noticiasFiltradas );
  }, [ items ] );

  useEffect( () => {
    filtrarNoticias( filtroSearch );
  }, [ filtroSearch, filtrarNoticias ] );

  return {
    noticiasFiltradas,
    handleChangeFiltro,
    filtroSearch
  };
};