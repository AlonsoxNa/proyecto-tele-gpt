import axios from "axios";

//const axiosInstance=AxiosInterceptor();
const API_URL=import.meta.env.VITE_API_ENDPOINT;
//const token = useUserStore.getState().user.token;

const BusServiceConductor ={

    obtenerBuses: async () => {
        try {
            const response = await axios.get(`${API_URL}/bus/todos-disponibles`, {
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
            console.error('Error al obtener Buses', error);
            return [];
        }
    }

}
export default BusServiceConductor;