import axios from "axios";
import { useUserStore } from '@/stores/user.store';

//const axiosInstance=AxiosInterceptor();
const API_URL=import.meta.env.VITE_API_ENDPOINT;
const token = useUserStore.getState().user.token;

const CategoriaService ={
    obtenerCategorias: async () => {
        try {
            const response = await axios.get(`${API_URL}/categoria`, {
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
            console.error('Error al obtener categorias', error);
            return [];
        }
    },
    registrarCategoria: async (nombre:string) => {
        try {
            const response = await axios.post(`${API_URL}/categoria`,{
                nombre:nombre
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                return {success:true,message:'Categoria registrada'};
            }
            else {
                return {success:false,message:'No se pudo registrar la categoría'};
            }
        } catch (error) {
            return {success:false,message:'No se pudo registrar la categoría'};
        }
    },
    modificarCategoria: async (nombre:string) => {
        try {
            const response = await axios.patch(`${API_URL}/categoria`,{
                nombre:nombre
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return {success:true,message:'Categoria actualizada'};
            }
            else {
                return {success:false,message:'No se pudo actualizar la categoría'};
            }
        } catch (error) {
            return {success:false,message:'No se pudo actualizar la categoría'};
        }
    },
    eliminarCategoria: async (id:string) => {
        try {
            const response = await axios.delete(`${API_URL}/categoria?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return {success:true,message:'Categoria eliminada'};
            }
            else {
                return {success:false,message:'No se pudo eliminada la categoría'};
            }
        } catch (error) {
            return {success:false,message:'No se pudo eliminada la categoría'};
        }
    }
}
export default CategoriaService;