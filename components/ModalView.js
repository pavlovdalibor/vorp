import { View } from "react-native";
import Constants from "expo-constants";

export function ModalView({ children }) {
    return (
        <View
            style={{
                paddingTop: Constants.statusBarHeight + 20,
                paddingHorizontal: 20,
                backgroundColor: "white",
                flexGrow: 1,
                gap: 20,
                paddingBottom: 30,
            }}
        >
            {children}
        </View>
    );
}
