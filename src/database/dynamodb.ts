import { DynamoDB } from 'aws-sdk';
import { databaseConfig } from '@/config/database';

export class DynamoDBClient {
    private static instance: DynamoDBClient;
    private client: DynamoDB.DocumentClient;

    private constructor() {
        this.client = new DynamoDB.DocumentClient({
            region: databaseConfig.region,
            endpoint: databaseConfig.endpoint,
            convertEmptyValues: true,
        });
    }

    public static getInstance(): DynamoDBClient {
        if (!DynamoDBClient.instance) {
            DynamoDBClient.instance = new DynamoDBClient();
        }
        return DynamoDBClient.instance;
    }

    public getClient(): DynamoDB.DocumentClient {
        return this.client;
    }
}