import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.IS_OFFLINE ? 'http://localhost:8000' : undefined,
    tablePrefix: process.env.STAGE || 'dev',
};

export const tables = {
    PERSONAJES: `${databaseConfig.tablePrefix}-PersonajesStarWars`
};