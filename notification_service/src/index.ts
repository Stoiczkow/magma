import { connectToRabbitMQ } from './rabbit';

const startService = async () => {
    await connectToRabbitMQ((msg: string) => {
        console.log(`Message: ${msg}`);
    });
}

startService();