import amqplib from 'amqplib';

import config from './config';

let channel: amqplib.Channel;

const rabbitClient = async () => {
    try {
        const connection = await amqplib.connect(config.rabbitUrl);
        channel = await connection.createChannel();

        for (const queue of Object.values(config.rabbitQueues)) {
            channel.assertQueue(queue, { durable: true });
        }
        return channel;
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}

rabbitClient()

export const sendMessageToRabbit = (message: string, queue: string) => {
    if (channel) {
        try {
            channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

            console.log(`Sent: ${message}`);

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

}

