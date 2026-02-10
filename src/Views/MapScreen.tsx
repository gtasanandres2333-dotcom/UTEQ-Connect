import { View, StyleSheet } from "react-native";
import MapViewContainer from "../Components/map/MapViewContainer";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapViewContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;