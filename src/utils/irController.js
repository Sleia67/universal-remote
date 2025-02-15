import { Platform } from 'react-native';
import { getDeviceCodes, getProtocol } from '../data/irCodes';
import { VirtualDevice } from '../testing/VirtualDeviceSimulator';

const virtualTV = new VirtualDevice('tv', 'SAMSUNG', null);

export const checkIRCapability = async () => {
  return true;
};

export const sendIRSignal = async (device, command) => {
  try {
    console.log('Sending command:', command);
    
    const codes = getDeviceCodes('tv', 'SAMSUNG', null);
    if (!codes) {
      throw new Error('No codes available for device');
    }

    console.log('Available commands:', Object.keys(codes));
    console.log('Looking for command:', command);

    if (!codes[command]) {
      throw new Error(`No code found for command: ${command}`);
    }

    const protocol = getProtocol('SAMSUNG');
    const response = virtualTV.receiveSignal({ command, signal: codes[command] });
    
    console.log('Signal sent:', {
      command,
      code: codes[command],
      response
    });

    return true;
  } catch (error) {
    console.error('Error sending IR signal:', error.message);
    return false;
  }
};
