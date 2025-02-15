export class VirtualDevice {
  constructor(type, brand, model) {
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.power = false;
    this.volume = 50;
    this.channel = 1;
    this.lastReceivedSignal = null;
  }

  receiveSignal(signal) {
    this.lastReceivedSignal = signal;
    
    switch(signal.command) {
      case 'power':
        this.power = !this.power;
        return `Device is now ${this.power ? 'ON' : 'OFF'}`;
      case 'volume_up':
        if (this.power) {
          this.volume = Math.min(100, this.volume + 5);
          return `Volume: ${this.volume}`;
        }
        return 'Device is off';
      case 'volume_down':
        if (this.power) {
          this.volume = Math.max(0, this.volume - 5);
          return `Volume: ${this.volume}`;
        }
        return 'Device is off';
      case 'channel_up':
        if (this.power) {
          this.channel++;
          return `Channel: ${this.channel}`;
        }
        return 'Device is off';
      case 'channel_down':
        if (this.power) {
          this.channel = Math.max(1, this.channel - 1);
          return `Channel: ${this.channel}`;
        }
        return 'Device is off';
      default:
        if (signal.command.startsWith('number_')) {
          if (this.power) {
            const number = signal.command.split('_')[1];
            this.channel = parseInt(number);
            return `Channel: ${this.channel}`;
          }
          return 'Device is off';
        }
        return 'Unknown command';
    }
  }

  getStatus() {
    return {
      power: this.power,
      volume: this.volume,
      channel: this.channel,
      lastSignal: this.lastReceivedSignal
    };
  }
}
