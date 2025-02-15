import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RemoteButton } from '../components/RemoteButton';
import { checkIRCapability, sendIRSignal } from '../utils/irController';
import { DEVICE_TYPES } from '../constants/remoteTypes';

export default function HomeScreen() {
  const [hasIR, setHasIR] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_TYPES.TV);

  useEffect(() => {
    checkIRSupport();
  }, []);

  const checkIRSupport = async () => {
    const irCapable = await checkIRCapability();
    setHasIR(irCapable);
    if (!irCapable) {
      Alert.alert(
        'No IR Support',
        'Your device does not support infrared control.'
      );
    }
  };

  const handleCommand = async (command) => {
    if (!hasIR) {
      Alert.alert('Error', 'IR functionality not available');
      return;
    }
    await sendIRSignal(selectedDevice, command);
  };

  return (
    <View style={styles.container}>
      <View style={styles.deviceSelector}>
        {Object.values(DEVICE_TYPES).map((device) => (
          <RemoteButton
            key={device}
            title={device.toUpperCase()}
            onPress={() => setSelectedDevice(device)}
            type="device"
            style={[
              selectedDevice === device && styles.selectedDevice,
            ]}
          />
        ))}
      </View>

      <View style={styles.remoteContainer}>
        <View style={styles.powerContainer}>
          <RemoteButton 
            title="Power" 
            onPress={() => handleCommand('power')} 
            type="power"
          />
        </View>
        
        <View style={styles.controlGroup}>
          <View style={styles.row}>
            <RemoteButton 
              title="Vol +" 
              onPress={() => handleCommand('volume_up')} 
              type="volume"
            />
            <RemoteButton 
              title="Ch +" 
              onPress={() => handleCommand('channel_up')} 
              type="channel"
            />
          </View>
          
          <View style={styles.row}>
            <RemoteButton 
              title="Vol -" 
              onPress={() => handleCommand('volume_down')} 
              type="volume"
            />
            <RemoteButton 
              title="Ch -" 
              onPress={() => handleCommand('channel_down')} 
              type="channel"
            />
          </View>
        </View>

        <View style={styles.numpad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <RemoteButton
              key={num}
              title={num.toString()}
              onPress={() => handleCommand(`number_${num}`)}
            />
          ))}
          <View style={styles.zeroContainer}>
            <RemoteButton
              title="0"
              onPress={() => handleCommand('number_0')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,  // Reduced top padding
    backgroundColor: '#f5f5f5',
  },
  deviceSelector: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 15,  // Reduced from 30
    paddingHorizontal: 10,
    gap: 12,
  },
  selectedDevice: {
    backgroundColor: '#343a40',
    transform: [{scale: 1.05}],
  },
  remoteContainer: {
    alignItems: 'center',
    gap: 20,  // Reduced from 25
  },
  powerContainer: {
    marginBottom: 10,  // Add space between power and controls
  },
  controlGroup: {
    gap: 12,  // Reduced from 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,  // Reduced from 20
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 240,  // Reduced from 280
    gap: 12,    // Reduced from 15
  },
  zeroContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 2,  // Reduced from 5
  },
});
