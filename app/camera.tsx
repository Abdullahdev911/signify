import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission,useCameraFormat } from 'react-native-vision-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../Context/themeContext';

export default function CameraScreen() {
  const { theme } = useTheme();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraType, setCameraType] = useState('back');
  const device = useCameraDevice(cameraType);
  const format = useCameraFormat(device,[
    {
      photoResolution:{width:1280,height:720}
    }
  ])
  const cameraRef = useRef(null);
  const socketRef = useRef(null);

  const [prediction, setPrediction] = useState('');
  const [currentChar, setCurrentChar] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const captureInterval = useRef(null);

  useEffect(() => {
    requestPermission();
    socketRef.current = new WebSocket('ws://192.168.100.11:8000/ws');

    socketRef.current.onmessage = (msg) => {
      const char = msg.data;
      if (char && char !== 'None' && char.length === 1) {
        setCurrentChar(char);
      }
    };

    return () => socketRef.current?.close();
  }, []);

  useEffect(() => {
    if (isCapturing) {
      startCapturing();
    } else {
      stopCapturing();
    }

    return () => stopCapturing();
  }, [isCapturing]);

const startCapturing = () => {
  console.log("Starting to capture frames...");

  captureInterval.current = setInterval(async () => {
    if (cameraRef.current && socketRef.current?.readyState === 1) {
      try {
        console.log("Attempting to capture frame...");

        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
          qualityPrioritization: 'speed',
          skipMetadata: true,
        });

        console.log("Photo captured:", photo);

        const result = await ImageManipulator.manipulateAsync(
          photo.path || photo.uri,
          [{ resize: { width: 128 } }],
          { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        if (result.base64) {
          console.log("Sending frame of size:", result.base64.length);
          socketRef.current.send(result.base64);
        } else {
          console.warn("No base64 result from manipulation");
        }
      } catch (err) {
        console.error("Frame capture error:", err);
      }
    } else {
      console.warn("Camera not ready or WebSocket not open");
    }
  }, 1000);
};



  const stopCapturing = () => {
    if (captureInterval.current) {
      clearInterval(captureInterval.current);
      captureInterval.current = null;
    }
  };

  useEffect(() => {
    if (currentChar) {
      setPrediction((prev) => prev + currentChar);
      setCurrentChar('');
    }
  }, [currentChar]);

  const speak = () => {
    if (prediction) {
      Speech.speak(prediction);
    }
  };

  const backspace = () => {
    setPrediction((prev) => prev.slice(0, -1));
  };

  const addSpace = () => {
    setPrediction((prev) => prev + ' ');
  };

  const flipCamera = () => {
    setCameraType((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleCapture = () => {
    setIsCapturing((prev) => !prev);
  };

  if (!hasPermission) return <Text>Camera permission not granted</Text>;
  if (device == null) return <Text>Loading camera...</Text>;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={true}
        format={format}
      />

      {/* Result Panel */}
      <View style={[styles.resultPanel, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: theme.text }]}>Detected Text</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scroll}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={[styles.prediction, { color: theme.primary }]}>
            {prediction || '--'}
          </Text>
        </ScrollView>
        <TouchableOpacity style={styles.speakerBtn} onPress={speak}>
          <Ionicons name="volume-high" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Control Buttons */}
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.card }]} onPress={flipCamera}>
          <Ionicons name="camera-reverse" size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.card }]} onPress={backspace}>
          <Ionicons name="backspace" size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.card }]} onPress={addSpace}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.card }]} onPress={toggleCapture}>
          <Ionicons
            name={isCapturing ? 'pause' : 'play'}
            size={20}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultPanel: {
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    width: '90%',
    minHeight: 90,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'OpenSans',
    marginBottom: 4,
  },
  prediction: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  speakerBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  btn: {
    padding: 14,
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});
