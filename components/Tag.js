import { Text, View } from "react-native";

export function Tag({ children, style }) {
    return (
        <View
            style={[
                {
                    backgroundColor: "#f2e3ff",
                    borderRadius: 6,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                },
                style,
            ]}
        >
            <Text style={{ color: "#a03bff", fontSize: 12 }}>{children}</Text>
        </View>
    );
}
