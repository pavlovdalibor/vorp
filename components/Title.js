import { Text } from "react-native";

export function Title({ children }) {
    return <Text style={{ fontSize: 36, fontWeight: "bold" }}>{children}</Text>;
}
