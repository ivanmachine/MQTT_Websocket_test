import mqtt, { MqttClient } from 'mqtt';
import { MQTT_CONFIG } from './config';
import SensorSimulator from './sensorSimulator';

class SensorApp {
  private client: MqttClient;
  private simulator: SensorSimulator;

  constructor() {
    this.simulator = new SensorSimulator();
    this.client = mqtt.connect(MQTT_CONFIG.url);
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.startPublishing();
    });

    this.client.on('error', (error) => {
      console.error('MQTT error:', error);
    });
  }

  private startPublishing() {
    // Publish sensor data every 5 seconds
    setInterval(() => {
      const readings = this.simulator.generateReadings();
      
      // Publish each sensor reading to its own topic
      this.client.publish(
        MQTT_CONFIG.topics.temperature,
        JSON.stringify({ 
          value: readings.temperature.toFixed(1), 
          unit: '°C',
          timestamp: readings.timestamp 
        })
      );

      this.client.publish(
        MQTT_CONFIG.topics.humidity,
        JSON.stringify({ 
          value: readings.humidity.toFixed(1), 
          unit: '%',
          timestamp: readings.timestamp 
        })
      );

      this.client.publish(
        MQTT_CONFIG.topics.pressure,
        JSON.stringify({ 
          value: readings.pressure.toFixed(1), 
          unit: 'hPa',
          timestamp: readings.timestamp 
        })
      );

      console.log('Published readings:', readings);
    }, 1000);
  }
}

// Start the application
new SensorApp(); 