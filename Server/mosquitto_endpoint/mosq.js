const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://mqtt-broker-url');

client.on('connect', () => {
  client.subscribe('meter/reading');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  // Process and store received data
  console.log('Received meter reading:', data);
});
