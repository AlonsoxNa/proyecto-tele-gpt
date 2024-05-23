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
    }

}
export default NoticiaService;