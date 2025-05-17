import React, {useState} from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { useNavigation } from "@react-navigation/native";

const QRScanner = () => {
  const [facing,getFacing] = useState("back");
  const [permission,requestPermission] = useCameraPermissions();
  const [scanned,setScanned] = useState(false);

  const navigation = useNavigation();

  if(!permission) return <View />;

  if(!permission.granted) {
    return (
      <View style={styles.container} >
        <Text style={styles.message}>We need your permission to access the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = ({data,type}) => {
    if(!scanned) {
      setScanned(true);
      // Alert.alert("Scanned Data",`${data}`);
      navigation.navigate('Transaction', { email: data });
      setTimeout(() => setScanned(false),3000 );
    }
  };

  const toggleCameraFacing = () => {
    setFacing(prev => (prev === "back" ? "back" : "back"));
  };

  return (
    <View style={styles.container} >
      <CameraView 
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a","upc_e","code39","code128"]
        }}
        onBarcodeScanned={handleScan}
      >
        <View style={styles.overlay} >
          <View style={styles.scanArea} />
        </View>
        
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex:1},
  message: {textAlign: "center", marginTop:20},
  camera: {flex:1},
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center"
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10
  },
});

export default QRScanner;

