import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, Button } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    props.onCodeScanned(type, data);
  };

  if (hasPermission === null) {
    return <Text style={{fontSize: RFPercentage(2.3), textAlign: 'center', color: "#FFFFFF"}}>Aguardando permissão para acesso a camera</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{fontSize: RFPercentage(2.3), textAlign: 'center' ,color: "#FFFFFF"}}>Sem acesso a camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "90%",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          title={"Repetir Escaneamento"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}