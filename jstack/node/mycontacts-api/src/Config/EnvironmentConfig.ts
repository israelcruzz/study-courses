import dotenv from 'dotenv';

dotenv.config();

export const environmentConfig = {
    port: process.env.PORT,
    isDev: process.env.isDevEnvironment
}