export const IR_CODES = {
  tv: {  // Changed to lowercase to match DEVICE_TYPES
    SAMSUNG: {
      GENERIC: {
        power: '0xE0E040BF',
        volume_up: '0xE0E0E01F',
        volume_down: '0xE0E0D02F',
        channel_up: '0xE0E048B7',
        channel_down: '0xE0E008F7',
        number_0: '0xE0E08877',
        number_1: '0xE0E020DF',
        number_2: '0xE0E0A05F',
        number_3: '0xE0E0609F',
        number_4: '0xE0E010EF',
        number_5: '0xE0E0906F',
        number_6: '0xE0E050AF',
        number_7: '0xE0E030CF',
        number_8: '0xE0E0B04F',
        number_9: '0xE0E0708F'
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
  }
};

export const getDeviceCodes = (deviceType, brand, model) => {
  try {
    const type = deviceType.toLowerCase();
    if (!IR_CODES[type] || !IR_CODES[type][brand]) {
      console.log('Available codes:', JSON.stringify(IR_CODES, null, 2));
      throw new Error(`No codes found for ${type} ${brand}`);
    }
    return IR_CODES[type][brand].GENERIC;
  } catch (error) {
    console.error('Error in getDeviceCodes:', error.message);
    return null;
  }
};

export const getProtocol = (brand) => {
  return IR_PROTOCOLS[brand] || IR_PROTOCOLS.SAMSUNG;
};
