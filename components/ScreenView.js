import { View } from "react-native";

export function ScreenView({ children }) {
    return (
        <View
            style={{
                padding: 20,
                backgroundColor: "white",
                flexGrow: 1,
                gap: 20,
            }}
        >
            {children}
        </View>
    );
}
