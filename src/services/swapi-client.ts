import axios from 'axios';
import { traducirAtributos } from '@/utils/traductor';

export class SWAPIClient {
    private baseURL = 'https://swapi.py4e.com/api';

    async obtenerPersonaje(id: number) {
        try {
            const respuesta = await axios.get(`${this.baseURL}/people/${id}`);
            return traducirAtributos(respuesta.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error(`Personaje con ID ${id} no encontrado en SWAPI`);
                }
                throw new Error(`Error de SWAPI: ${error.message}`);
            }
            throw error;
        }
    }
}