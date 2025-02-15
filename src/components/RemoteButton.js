import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export const RemoteButton = ({ onPress, title, style, type = 'default' }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      styles[type],
      style,
      pressed && styles.pressed,
      pressed && styles[`${type}Pressed`]
    ]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, styles[`${type}Text`]]}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 40,
    width: 70,  // Reduced from 80
    height: 70, // Reduced from 80
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  pressed: {
    transform: [{scale: 0.95}],
    elevation: 1,
  },
  buttonText: {
    fontSize: 15,  // Slightly smaller font
    fontWeight: 'bold',
    color: 'white',
  },
  default: {
    backgroundColor: '#2196F3',
  },
  defaultPressed: {
    backgroundColor: '#1976D2',
  },
  power: {
    backgroundColor: '#dc3545',
    width: 65,  // Make power button slightly smaller
    height: 65,
  },
  powerPressed: {
    backgroundColor: '#c82333',
  },
  volume: {
    backgroundColor: '#28a745',
  },
  volumePressed: {
    backgroundColor: '#218838',
  },
  channel: {
    backgroundColor: '#ffc107',
  },
  channelPressed: {
    backgroundColor: '#e0a800',
  },
  channelText: {
    color: '#000000',
  },
  device: {
    backgroundColor: '#6c757d',
    width: 90,    // Slightly smaller device buttons
    height: 40,
    borderRadius: 20,
  },
  devicePressed: {
    backgroundColor: '#5a6268',
  },
  deviceText: {
    fontSize: 13,
  },
});
