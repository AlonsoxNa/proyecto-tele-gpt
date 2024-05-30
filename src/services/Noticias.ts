import axios from "axios";
import { useUserStore } from '@/stores/user.store';

//const axiosInstance=AxiosInterceptor();
const API_URL=import.meta.env.VITE_API_ENDPOINT;
const token = useUserStore.getState().user.token;

const NoticiaService ={
    obtenerNoticiasMostradas: async () => {
        try {
            const response = await axios.get(`${API_URL}/noticia/habilitadas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(response)
                return [];
            }
        } catch (error) {
            console.error('Error al obtener noticias', error);
            return [];
        }
    },
    registrarNoticiaNormal: async (duracion: number, titulo: string, contenido : string, tipo : string, multimedia : string, extension : string, categoriaId : string ) => {
        try {
            const response = await axios.post(`${API_URL}/noticia/noticia-normal`, {

                duracion, titulo, contenido, tipo, multimedia, extension, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 201) {
                console.log("Noticia normal registrada correctamente.");
                return true;
            }
            else {
                console.log(response)
                return false;
            }
        } catch (error) {
            console.error('Error al registrar noticia normal', error);
            return false;
        }
    },
    registrarNoticiaPublicacion: async (duracion: number, titulo: string, contenido : string, tipo : string, categoriaId : string ) => {
        try {
            const response = await axios.post(`${API_URL}/noticia/noticia-publicacion`, {

                duracion, titulo, contenido, tipo, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 201) {
                console.log("Noticia publicacion registrada correctamente.");
                return true;
            }
            else {
                console.log(response)
                return false;
            }
        } catch (error) {
            console.error('Error al registrar noticia publicacion', error);
            return false;
        }
    },
    registrarNoticiaFoto: async (duracion: number, titulo: string, tipo : string, multimedia : string, extension : string, categoriaId : string ) => {
        try {
            const response = await axios.post(`${API_URL}/noticia/noticia-foto`, {

                duracion, titulo, tipo, multimedia, extension, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 201) {
                console.log("Noticia foto registrada correctamente.");
                return true;
            }
            else {
                console.log(response)
                return false;
            }
        } catch (error) {
            console.error('Error al registrar noticia foto', error);
            return false;
        }
    },
    registrarNoticiaVideo: async (duracion: number, titulo: string, tipo : string, multimedia_url : string, categoriaId : string ) => {
        try {
            const response = await axios.post(`${API_URL}/noticia/noticia-video`, {

                duracion, titulo, tipo, multimedia_url, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 201) {
                console.log("Noticia video registrada correctamente.");
                return true;
            }
            else {
                console.log(response)
                return false;
            }
        } catch (error) {
            console.error('Error al registrar noticia video', error);
            return false;
        }
    }

}
export default NoticiaService;