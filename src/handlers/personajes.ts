import { APIGatewayProxyHandler } from 'aws-lambda';
import { SWAPIClient } from '@/services/swapi-client';
import { PersonajeRepositorio } from '@/models/personaje.model';
import { traducirAtributos } from '@/utils/traductor';
import { APIResponse, ErrorResponse } from '@/core/types/response.type';

const swapiClient = new SWAPIClient();
const personajeRepo = new PersonajeRepositorio();

export const crear: APIGatewayProxyHandler = async (event: { body: any; }): Promise<APIResponse> => {
    try {
        const { swapiId } = JSON.parse(event.body || '{}');

        if (!swapiId) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mensaje: 'ID de SWAPI es requerido'
                } as ErrorResponse)
            };
        }

        const personajeSWAPI = await swapiClient.obtenerPersonaje(swapiId);
        const personajeTraducido = traducirAtributos(personajeSWAPI);
        const personajeGuardado = await personajeRepo.guardar(personajeTraducido);

        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personajeGuardado)
        };
    } catch (error) {
        console.error('Error en crear personaje:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mensaje: 'Error interno del servidor',
                detalles: process.env.STAGE === 'dev' ? (error as Error).message : undefined
            } as ErrorResponse)
        };
    }
};

export const listar: APIGatewayProxyHandler = async (): Promise<APIResponse> => {
    try {
        const personajes = await personajeRepo.obtenerTodos();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personajes)
        };
    } catch (error) {
        console.error('Error en listar personajes:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mensaje: 'Error interno del servidor',
                detalles: process.env.STAGE === 'dev' ? (error as Error).message : undefined
            } as ErrorResponse)
        };
    }
};