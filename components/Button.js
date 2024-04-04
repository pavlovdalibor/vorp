import { Children, cloneElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function Button({
    children,
    onPress,
    bg = "#a03bff",
    fg = "white",
    border = false,
    flex = false,
}) {
    return (
        <Pressable
            style={[
                styles.button,
                {
                    backgroundColor: bg,
                    borderWidth: border ? 1 : 0,
                    borderColor: fg,
                    flexGrow: flex ? 1 : 0,
                },
            ]}
            onPress={onPress}
        >
            {Children.map(children, (child) =>
                cloneElement(child, {
                    style: [{ color: fg }, child.props.style, styles.text],
                })
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
});
