import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width,
        height
    },
    zoomContainer: {
        position: "absolute",
        right: 16,
        bottom: 120,
        zIndex: 5
    },
    button: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
});