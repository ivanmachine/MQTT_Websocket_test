import { Server } from "socket.io";
import mqtt from 'mqtt';

const io = new Server(8080, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Connect to MQTT broker
const mqttClient = mqtt.connect('mqtt://localhost:1883');

// Subscribe to all sensor topics
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('sensors/#');
});

// Handle MQTT messages and forward to WebSocket clients
mqttClient.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        const sensorType = topic.split('/')[1]; // Extract 'temperature', 'humidity', etc.
        io.emit(sensorType, data); // Forward to all WebSocket clients
    } catch (error) {
        console.error('Error parsing MQTT message:', error);
    }
});

io.on("connection", (socket) => {
    console.log("WebSocket client connected");

    socket.on("disconnect", () => {
        console.log("WebSocket client disconnected");
    });
});