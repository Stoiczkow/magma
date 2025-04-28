import dotenv from 'dotenv';

dotenv.config();

type RabbitQueues = {
    userCreated: string,
    userDeleted: string
}

interface Config {
    port: number;
    dbUrl: string;
    dbName: string;
    dbUser: string;
    dbPass: string;
    rabbitUrl: string;
    rabbitQueues: RabbitQueues;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    dbUrl: process.env.DB_URL || 'localhost:27017',
    dbName: process.env.DB_NAME || 'test',
    dbUser: process.env.DB_USER || 'root',
    dbPass: process.env.DB_PASS || 'example',
    rabbitUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    rabbitQueues: JSON.parse(process.env.QUEUES ? process.env.QUEUES : '{}'),
};

export default config;
