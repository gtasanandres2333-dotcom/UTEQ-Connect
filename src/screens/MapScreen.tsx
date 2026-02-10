// src/screens/MapScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import MapViewContainer from "../Components/map/MapViewContainer";

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapViewContainer />
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});