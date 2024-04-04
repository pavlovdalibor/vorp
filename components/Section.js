import { View, Text, ScrollView } from "react-native";

export function Section({ children, name, scroll }) {
    return (
        <View style={{ gap: 10 }}>
            <Text>{name}</Text>
            {scroll ? (
                <ScrollView
                    horizontal
                    style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        padding: 10,
                        gap: 10,
                        overflow: "scroll",
                    }}
                >
                    {children}
                </ScrollView>
            ) : (
                <View
                    horizontal
                    style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        padding: 10,
                        gap: 10,
                    }}
                >
                    {children}
                </View>
            )}
        </View>
    );
}
