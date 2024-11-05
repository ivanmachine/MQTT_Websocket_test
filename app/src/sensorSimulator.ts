class SensorSimulator {
  private baseTemperature = 20; // °C
  private baseHumidity = 50;    // %
  private basePressure = 1013;  // hPa

  generateReadings() {
    return {
      temperature: this.baseTemperature + (Math.random() * 10 - 5),
      humidity: this.baseHumidity + (Math.random() * 20 - 10),
      pressure: this.basePressure + (Math.random() * 20 - 10),
      timestamp: new Date().toISOString()
    };
  }
}

export default SensorSimulator; 