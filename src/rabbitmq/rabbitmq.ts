import * as process from 'process';
import * as amqp from 'amqplib/callback_api';

const rabbitMQURL = process.env.RABBITMQ_URL;
const rabbitMQExchange = process.env.EXCHANGE_NAME;
const rabbitMQQueue = process.env.QUEUE_NAME;
let rabbitMQChannel: amqp.Channel;

export const setupRabbitMQ = () => {
  try {
    amqp.connect(rabbitMQURL, (error0, connection) => {
      if (error0) throw error0;

      connection.createChannel((error1, channel) => {
        if (error1) throw error1;

        channel.assertExchange(rabbitMQExchange, 'direct', { durable: true });
        channel.assertQueue(rabbitMQQueue, { durable: true });
        channel.bindQueue(rabbitMQQueue, rabbitMQExchange, '');
        rabbitMQChannel = channel;
        console.log('Connected to RabbitMQ');
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const getRabbitMQChannel = () => rabbitMQChannel;
