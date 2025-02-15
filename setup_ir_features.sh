#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up IR Remote features...${NC}"

# Create necessary directories
mkdir -p src/data
mkdir -p src/utils

# Create irCodes.js
echo -e "${BLUE}Creating IR codes database...${NC}"
cat > src/data/irCodes.js << 'IRCODESEOF'
export const IR_CODES = {
  TV: {
    SAMSUNG: {
      MODELS: {
        'UN55NU7100': {  // Example model number
          power: '0x0E0E0',
          volumeUp: '0x0E0E1',
          volumeDown: '0x0E0E2',
          channelUp: '0x0E0E3',
          channelDown: '0x0E0E4',
          numbers: {
            0: '0x0E0E5',
            1: '0x0E0E6',
            2: '0x0E0E7',
            3: '0x0E0E8',
            4: '0x0E0E9',
            5: '0x0E0EA',
            6: '0x0E0EB',
            7: '0x0E0EC',
            8: '0x0E0ED',
            9: '0x0E0EE'
          }
        }
      },
      GENERIC: {
        power: '0x0E0E0',
        volumeUp: '0x0E0E1',
        volumeDown: '0x0E0E2',
        channelUp: '0x0E0E3',
        channelDown: '0x0E0E4',
        numbers: {
          0: '0x0E0E5',
          1: '0x0E0E6',
          2: '0x0E0E7',
          3: '0x0E0E8',
          4: '0x0E0E9',
          5: '0x0E0EA',
          6: '0x0E0EB',
          7: '0x0E0EC',
          8: '0x0E0ED',
          9: '0x0E0EE'
        }
      }
    },
    LG: {
      GENERIC: {
        // LG specific codes
      }
    },
    SONY: {
      GENERIC: {
        // Sony specific codes
      }
    }
  },
  AC: {
    CARRIER: {
      GENERIC: {
        power: '0x0F0F0',
        tempUp: '0x0F0F1',
        tempDown: '0x0F0F2',
        mode: '0x0F0F3',
        fanSpeed: '0x0F0F4'
      }
    }
  }
};

export const IR_PROTOCOLS = {
  SAMSUNG: {
    name: 'Samsung',
    frequency: 38000,
    dutyCycle: 0.33,
    headerMark: 4500,
    headerSpace: 4500,
    bitMark: 560,
    oneSpace: 1690,
    zeroSpace: 560,
    stopBit: 560
  },
  NEC: {
    name: 'NEC',
    frequency: 38000,
    dutyCycle: 0.33,
    headerMark: 9000,
    headerSpace: 4500,
    bitMark: 560,
    oneSpace: 1690,
    zeroSpace: 560,
    stopBit: 560
  }
};

export const getDeviceCodes = (deviceType, brand, model) => {
  try {
    if (model && IR_CODES[deviceType][brand].MODELS[model]) {
      return IR_CODES[deviceType][brand].MODELS[model];
    }
    return IR_CODES[deviceType][brand].GENERIC;
  } catch (error) {
    console.error(`No codes found for ${deviceType} ${brand} ${model}`);
    return null;
  }
};

export const getProtocol = (brand) => {
  return IR_PROTOCOLS[brand] || IR_PROTOCOLS.NEC;
};
IRCODESEOF

# Create deviceManager.js
echo -e "${BLUE}Creating device manager...${NC}"
cat > src/utils/deviceManager.js << 'DEVICEMANAGEREOF'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICES_STORAGE_KEY = '@saved_devices';

export class DeviceManager {
  static async saveDevice(device) {
    try {
      const savedDevices = await this.getSavedDevices();
      const updatedDevices = [...savedDevices, device];
      await AsyncStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(updatedDevices));
      return true;
    } catch (error) {
      console.error('Error saving device:', error);
      return false;
    }
  }

  static async getSavedDevices() {
    try {
      const devices = await AsyncStorage.getItem(DEVICES_STORAGE_KEY);
      return devices ? JSON.parse(devices) : [];
    } catch (error) {
      console.error('Error getting saved devices:', error);
      return [];
    }
  }

  static async removeDevice(deviceId) {
    try {
      const savedDevices = await this.getSavedDevices();
      const updatedDevices = savedDevices.filter(device => device.id !== deviceId);
      await AsyncStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(updatedDevices));
      return true;
    } catch (error) {
      console.error('Error removing device:', error);
      return false;
    }
  }

  static async updateDevice(deviceId, updates) {
    try {
      const savedDevices = await this.getSavedDevices();
      const deviceIndex = savedDevices.findIndex(device => device.id === deviceId);
      if (deviceIndex >= 0) {
        savedDevices[deviceIndex] = { ...savedDevices[deviceIndex], ...updates };
        await AsyncStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(savedDevices));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating device:', error);
      return false;
    }
  }
}

export class Device {
  constructor(type, brand, model = null) {
    this.id = `${type}_${brand}_${model || 'generic'}_${Date.now()}`;
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.name = `${brand} ${type}${model ? ` (${model})` : ''}`;
    this.customButtons = {};
  }

  addCustomButton(name, code) {
    this.customButtons[name] = code;
  }

  removeCustomButton(name) {
    delete this.customButtons[name];
  }
}
DEVICEMANAGEREOF

# Update irController.js
echo -e "${BLUE}Updating IR controller...${NC}"
cat > src/utils/irController.js << 'IRCONTROLLEREOF'
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
IRCONTROLLEREOF

# Make the script executable
chmod +x src/utils/irController.js

echo -e "${GREEN}IR Remote features setup complete!${NC}"
echo -e "${BLUE}New files created:${NC}"
echo "- src/data/irCodes.js"
echo "- src/utils/deviceManager.js"
echo "- src/utils/irController.js (updated)"
