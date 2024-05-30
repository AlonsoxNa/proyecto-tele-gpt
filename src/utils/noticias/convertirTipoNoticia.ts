export const convertirTipoNoticia = ( tipo: string ) => {

  if ( tipo === 'Url' ) {
    return 'Solo video';
  } else if ( tipo === 'Multimedia' ) {
    return 'Solo foto';
  } else {
    return tipo;
  }

};
