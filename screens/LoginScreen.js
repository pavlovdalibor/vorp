import Constants from "expo-constants";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { login } from "../api";
import { StatusBar } from "expo-status-bar";

export function LoginScreen({ onAuthenticated }) {
    const [Email, SetEmail] = useState(undefined);
    const [Password, SetPassword] = useState(undefined);

    async function attemptLogin() {
        const response = await login(Email, Password);

        if (response.success) {
            onAuthenticated();
        }
    }

    return (
        <View style={styles.loginScreen}>
            <StatusBar style="dark" />
            <Text style={styles.title}>
                Willkommen zu {"\n"}
                <Text style={styles.logo}>vorp</Text>
            </Text>
            <Text style={styles.indicator}>Bitte loggen Sie sich ein.</Text>
            <View style={styles.form}>
                <Input
                    setter={SetEmail}
                    title="Email"
                    placeholder="max.muster@ksb-sg.ch"
                />
                <Input
                    setter={SetPassword}
                    title="Passwort"
                    hidden
                    placeholder="testuser"
                />
                <Button onPress={attemptLogin}>
                    <Text>Einloggen</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loginScreen: {
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        marginHorizontal: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 50,
        width: "100%",
    },
    logo: {
        fontSize: 30,
        color: "#a03bff",
        fontFamily: "Varela Round",
        width: "100%",
    },
    indicator: {
        color: "gray",
        marginBottom: 20,
        width: "100%",
    },
    form: {
        gap: 12,
        width: "100%",
    },
});
