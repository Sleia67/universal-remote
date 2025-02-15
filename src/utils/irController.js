import { Platform } from 'react-native';
import { getDeviceCodes, getProtocol } from '../data/irCodes';
import { VirtualDevice } from '../testing/VirtualDeviceSimulator';

// Create a virtual device for testing
const virtualTV = new VirtualDevice('TV', 'SAMSUNG', 'UN55NU7100');

export const checkIRCapability = async () => {
  // Always return true in test environment
  return true;
};

export const generateIRSignal = (code, protocol) => {
  const binaryCode = parseInt(code, 16).toString(2).padStart(32, '0');
  const signal = [];
  
  signal.push(protocol.headerMark);
  signal.push(-protocol.headerSpace);
  
  for (let bit of binaryCode) {
    signal.push(protocol.bitMark);
    signal.push(bit === '1' ? -protocol.oneSpace : -protocol.zeroSpace);
  }
  
  signal.push(protocol.stopBit);
  
  return {
    frequency: protocol.frequency,
    pattern: signal,
    dutyCycle: protocol.dutyCycle
  };
};

export const sendIRSignal = async (device, command) => {
  try {
    const codes = getDeviceCodes(device.type, device.brand, device.model);
    const protocol = getProtocol(device.brand);
    
    if (!codes || !codes[command]) {
      throw new Error(`No code found for command: ${command}`);
    }
    
    const signal = generateIRSignal(codes[command], protocol);
    
    // Send to virtual device and get response
    const response = virtualTV.receiveSignal({ command, signal });
    
    // Get device status
    const status = virtualTV.getStatus();
    
    // Log the simulation results
    console.log('Virtual TV Status:', {
      response,
      power: status.power ? 'ON' : 'OFF',
      volume: status.volume,
      channel: status.channel
    });
    
    return true;
  } catch (error) {
    console.error('Error sending IR signal:', error);
    return false;
  }
};

