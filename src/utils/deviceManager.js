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
