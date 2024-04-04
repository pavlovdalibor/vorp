import { Pressable, StyleSheet, Text } from "react-native";

export function Button({ text, onPress, bg = "#a03bff", fg = "white" }) {
    return (
        <Pressable
            style={[styles.button, { backgroundColor: bg }]}
            onPress={onPress}
        >
            <Text style={{ color: fg }}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});
