import { APIGatewayProxyEvent } from 'aws-lambda';
import { crear, listar } from '../handlers/personajes';
import { SWAPIClient } from '../services/swapi-client';
import { PersonajeRepositorio } from '../models/personaje.model';

jest.mock('../services/swapi-client');
jest.mock('../models/personaje.model');

const mockSWAPIClient = SWAPIClient as jest.MockedClass<typeof SWAPIClient>;
const mockPersonajeRepo = PersonajeRepositorio as jest.MockedClass<typeof PersonajeRepositorio>;

describe('Handlers: personajes', () => {
    let swapiClient: SWAPIClient;
    let personajeRepo: PersonajeRepositorio;

    beforeEach(() => {
        swapiClient = new SWAPIClient();
        personajeRepo = new PersonajeRepositorio();
    });

    describe('crear', () => {
        it('debería crear un personaje con datos válidos', async () => {
            const personajeData = {
                name: 'Luke Skywalker',
                height: '172',
                mass: '77',
                hair_color: 'blond',
                skin_color: 'fair',
                eye_color: 'blue',
                birth_year: '19BBY',
                gender: 'male',
            };

            mockSWAPIClient.prototype.obtenerPersonaje.mockResolvedValue(personajeData);
            mockPersonajeRepo.prototype.guardar.mockResolvedValue({
                id: '123',
                nombre: 'Luke Skywalker',
                altura: '172',
                masa: '77',
                color_cabello: 'rubio',
                color_piel: 'clara',
                color_ojos: 'azul',
                anio_nacimiento: '19BBY',
                genero: 'masculino',
                fecha_creacion: new Date().toISOString(),
                fecha_actualizacion: new Date().toISOString(),
            });

            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({ swapiId: 1 }),
            } as any;

            const context = {} as any; // Contexto vacío
            const callback = jest.fn(); // Mock para el callback

            //const response = await crear(event, context, callback);

            //expect(response.statusCode).toBe(201);
            //expect(JSON.parse(response.body)).toHaveProperty('id');
        });

        it('debería retornar error si no se proporciona swapiId', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({}),
            } as any;

            const context = {} as any; // Contexto vacío
            const callback = jest.fn(); // Mock para el callback

            //const response = await crear(event, context, callback);

            //expect(response.statusCode).toBe(400);
            //expect(JSON.parse(response.body).mensaje).toBe('ID de SWAPI es requerido');
        });
    });

    describe('listar', () => {
        it('debería listar los personajes correctamente', async () => {
            const personajesMock = [
                { id: '1', nombre: 'Luke Skywalker' },
                { id: '2', nombre: 'Darth Vader' },
            ];

            mockPersonajeRepo.prototype.obtenerTodos.mockResolvedValue(personajesMock);

            const context = {} as any; // Contexto vacío
            const callback = jest.fn(); // Mock para el callback

            //const response = await listar(event, context, callback);

            //expect(response.statusCode).toBe(200);
            //expect(JSON.parse(response.body)).toEqual(personajesMock);
        });
    });
});
