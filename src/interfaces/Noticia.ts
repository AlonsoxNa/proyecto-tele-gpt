export interface Noticia {
  id: string;
  titulo: string;
  fechaRegistro: string;
  habilitado: boolean;
  duracion: number;
  contenido: string;
  tipo: string;
  multimedia: string;
}

export interface ResponseCambiarEstadoNoticia {
  status: number;
  message?: string;
  response: {
    status: number;
    message?: string;
  };
}