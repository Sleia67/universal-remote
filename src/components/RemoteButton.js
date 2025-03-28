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
    <Text style={[styles.buttonText, styles[`${type}Text`]]} numberOfLines={1}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 40,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  pressed: {
    transform: [{scale: 0.95}],
    elevation: 1,
  },
  buttonText: {
    fontSize: 15,
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
    width: 140,        // Even wider
    height: 50,        // Slightly taller
    borderRadius: 25,  // More oval shape
    paddingHorizontal: 20, // Add horizontal padding
  },
  powerPressed: {
    backgroundColor: '#c82333',
  },
  powerText: {
    fontSize: 18,      // Larger text for better visibility
    textAlign: 'center',
    width: '100%',     // Ensure text uses full width
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
    width: 90,
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

