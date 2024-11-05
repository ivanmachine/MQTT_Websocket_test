import aedes, { Client, Connection, PublishPacket } from 'aedes';
import { createServer } from 'net';

// Create the broker instance
const broker = new aedes();
const port = 1883; // Default MQTT port

// Create TCP server
const server = createServer(broker.handle);

// Handle client connections
broker.on('client', (client: Client) => {
  console.log(`Client Connected: ${client.id}`);
});

// Handle client disconnections
broker.on('clientDisconnect', (client: Client) => {
  console.log(`Client Disconnected: ${client.id}`);
});

// Handle published messages
broker.on('publish', (packet: PublishPacket, client: Client | null) => {
  if (client) {
    console.log(`Message from ${client.id}:`, {
      topic: packet.topic,
      payload: packet.payload.toString()
    });
  }
});

// Handle subscriptions
broker.on('subscribe', (subscriptions: { topic: string }[], client: Client) => {
  console.log(`${client.id} subscribed to:`, subscriptions.map(s => s.topic));
});

// Start the server
server.listen(port, () => {
  console.log(`MQTT Broker running on port ${port}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
}); 