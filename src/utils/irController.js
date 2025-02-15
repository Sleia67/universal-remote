import { Platform } from 'react-native';
import { getDeviceCodes, getProtocol } from '../data/irCodes';

export const checkIRCapability = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }
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
    
    console.log('Sending IR signal:', {
      device: device.name,
      command,
      signal
    });
    
    return true;
  } catch (error) {
    console.error('Error sending IR signal:', error);
    return false;
  }
};

export const learnIRSignal = async () => {
  throw new Error('IR learning not implemented yet');
};
