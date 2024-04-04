import { StyleSheet, Text, TextInput, View } from "react-native";

export function Input({ setter, title, hidden }) {
    return (
        <View style={styles.input}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={hidden}
                onChangeText={setter}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        gap: 6,
        width: "100%",
    },
    textInput: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: "whitesmoke",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
    },
});
