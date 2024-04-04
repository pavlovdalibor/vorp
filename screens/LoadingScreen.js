import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native";
import Constant from "expo-constants";

export function LoadingScreen() {
    return (
        <View style={styles.loadingScreen}>
            <Text style={styles.text}>vorp</Text>
            <ActivityIndicator color="#a03bff" size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingScreen: {
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        gap: 10,
        padding: Constant.statusBarHeight + 50,
    },
    logo: {
        color: "#a03bff",
        fontSize: 50,
    },
    text: {
        color: "#a03bff",
        fontSize: 26,
        fontWeight: "bold",
        textAlignVertical: "center",
    },
});
