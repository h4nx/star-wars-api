import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from '@/database/dynamodb';
import { tables } from '@/config/database';
import { IPersonaje, IPersonajeCreate } from '@/core/interfaces/personaje.interface';

export class PersonajeRepositorio {
    private dynamoDB: AWS.DynamoDB.DocumentClient;
    private tableName: string;

    constructor() {
        this.dynamoDB = DynamoDBClient.getInstance().getClient();
        this.tableName = tables.PERSONAJES;
    }

    async guardar(personaje: IPersonajeCreate): Promise<IPersonaje> {
        const timestamp = new Date().toISOString();
        const nuevoPersonaje: IPersonaje = {
            id: uuidv4(),
            ...personaje,
            fecha_creacion: timestamp,
            fecha_actualizacion: timestamp
        };

        try {
            await this.dynamoDB.put({
                TableName: this.tableName,
                Item: nuevoPersonaje
            }).promise();

            return nuevoPersonaje;
        } catch (error) {
            console.error('Error al guardar personaje:', error);
            throw new Error('Error al guardar el personaje en la base de datos');
        }
    }

    async obtenerTodos(): Promise<IPersonaje[]> {
        try {
            const resultado = await this.dynamoDB.scan({
                TableName: this.tableName
            }).promise();

            return resultado.Items as IPersonaje[];
        } catch (error) {
            console.error('Error al obtener personajes:', error);
            throw new Error('Error al obtener personajes de la base de datos');
        }
    }

    async obtenerPorId(id: string): Promise<IPersonaje | null> {
        try {
            const resultado = await this.dynamoDB.get({
                TableName: this.tableName,
                Key: { id }
            }).promise();

            return resultado.Item as IPersonaje || null;
        } catch (error) {
            console.error('Error al obtener personaje por ID:', error);
            throw new Error('Error al obtener el personaje de la base de datos');
        }
    }
}