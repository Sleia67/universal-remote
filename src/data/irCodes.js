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
