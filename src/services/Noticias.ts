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
    obtenerNoticiaPorId: async (id) => {
        try {
          const response = await axios.get(`${API_URL}/noticia/find-by-id`, {
            params: {
              id: id
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            return response.data;
          } else if (response.status === 204) {
            // Noticia no encontrada
            return null;
          } else {
            // Otro código de estado, manejar según sea necesario
            console.log(response);
            return null;
          }
        } catch (error) {
          console.error('Error al obtener noticia por ID', error);
          throw error;
        }
    },
    modificarNoticiaNormal: async (id : string, duracion: number, titulo: string, contenido : string, multimedia : string, extension : string, categoriaId : string ) => {
        try {
            const response = await axios.patch(`${API_URL}/noticia/modificar-noticia-normal?id=${id}`, {

                duracion, titulo, contenido, multimedia, extension, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 204) {
                return {success:true,message:'Modificar noticia normal registrada correctamente.'}
            }
            else {
                return {success:false,message:'No se pudo actualizar la noticia'};
            }
        } catch (error:any) {
            let message = ''
            if (error.status == 400){
                message = 'Error de campos'
            }else if (error.status == 404){
                message = 'No existe noticia/categoria'
            }else if (error.status == 409){
                message = 'No se pudo actualizar la noticia'
            }else{
                message = 'No se pudo actualizar la noticia'
            }
            return {success:false,message:message};
        }
    },
    modificarNoticiaPublicacion: async (id : string, duracion: number, titulo: string, contenido : string, categoriaId : string ) => {
        try {
            const response = await axios.patch(`${API_URL}/noticia/modificar-noticia-publicacion?id=${id}`, {

                duracion, titulo, contenido, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 204) {
                return {success:true,message:'Modificar noticia normal registrada correctamente.'}
            }
            else {
                return {success:false,message:'No se pudo actualizar la noticia'};
            }
        } catch (error:any) {
            let message = ''
            if (error.status == 400){
                message = 'Error de campos'
            }else if (error.status == 404){
                message = 'No existe noticia/categoria'
            }else if (error.status == 409){
                message = 'No se pudo actualizar la noticia'
            }else{
                message = 'No se pudo actualizar la noticia'
            }
            return {success:false,message:message};
        }
    },
    modificarNoticiaFoto: async (id : string, duracion: number, titulo: string, multimedia : string, extension : string, categoriaId : string ) => {
        try {
            const response = await axios.patch(`${API_URL}/noticia/modificar-noticia-foto?id=${id}`, {

                duracion, titulo, multimedia, extension, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 204) {
                return {success:true,message:'Modificar noticia normal registrada correctamente.'}
            }
            else {
                return {success:false,message:'No se pudo actualizar la noticia'};
            }
        } catch (error:any) {
            let message = ''
            if (error.status == 400){
                message = 'Error de campos'
            }else if (error.status == 404){
                message = 'No existe noticia/categoria'
            }else if (error.status == 409){
                message = 'No se pudo actualizar la noticia'
            }else{
                message = 'No se pudo actualizar la noticia'
            }
            return {success:false,message:message};
        }
    },
    modificarNoticiaVideo: async (id : string, duracion: number, titulo: string, multimedia_url : string, categoriaId : string ) => {
        try {
            const response = await axios.patch(`${API_URL}/noticia/modificar-noticia-video?id=${id}`, {
                duracion, titulo, multimedia_url, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 204) {
                return {success:true,message:'Modificar noticia normal registrada correctamente.'}
            }
            else {
                return {success:false,message:'No se pudo actualizar la noticia'};
            }
        } catch (error:any) {
            let message = ''
            if (error.status == 400){
                message = 'Error de campos'
            }else if (error.status == 404){
                message = 'No existe noticia/categoria'
            }else if (error.status == 409){
                message = 'No se pudo actualizar la noticia'
            }else{
                message = 'No se pudo actualizar la noticia'
            }
            return {success:false,message:message};
        }
    },
    registrarNoticiaVideo: async (duracion: number, titulo: string, multimedia_url : string, categoriaId : string ) => {
        try {
            const response = await axios.patch(`${API_URL}/noticia/noticia-video`, {

                duracion, titulo, multimedia_url, categoriaId
            }, {
                headers: {
                    Authorization: `Bearer ${useUserStore.getState().user.token}`
                }
            });
            if (response.status === 201) {
                console.log("Modificar noticia video registrada correctamente.");
                return true;
            }
            else {
                console.log(response)
                return false;
            }
        } catch (error) {
            console.error('Error al modificar noticia video', error);
            return false;
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
    // registrarNoticiaVideo: async (duracion: number, titulo: string, tipo : string, multimedia_url : string, categoriaId : string ) => {
    //     try {
    //         const response = await axios.post(`${API_URL}/noticia/noticia-video`, {

    //             duracion, titulo, tipo, multimedia_url, categoriaId
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${useUserStore.getState().user.token}`
    //             }
    //         });
    //         if (response.status === 201) {
    //             console.log("Noticia video registrada correctamente.");
    //             return true;
    //         }
    //         else {
    //             console.log(response)
    //             return false;
    //         }
    //     } catch (error) {
    //         console.error('Error al registrar noticia video', error);
    //         return false;
    //     }
    // }

}
export default NoticiaService;