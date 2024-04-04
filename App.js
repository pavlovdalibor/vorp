import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import VarelaRound from "./assets/varela-round.ttf";
import { StatusBar } from "expo-status-bar";

import { LoadingScreen, HomeScreen, LoginScreen } from "./screens";
import { useFonts } from "expo-font";

import { Navigator, Screen } from "./components/TabNavigator";
import { isAuthenticated } from "./api";
import { UserProvider } from "./context/UserContext";

import { Ionicons } from "@expo/vector-icons";
import { EntriesScreen } from "./screens/EntriesScreen";
import { EntriesProvider } from "./context/EntriesContext";

export default function App() {
    const [Loading, SetLoading] = useState(true);
    const [Authenticated, SetAuthenticated] = useState(isAuthenticated());
    const [FontLoaded] = useFonts({ "Varela Round": VarelaRound });

    useEffect(() => {
        (async () => {
            if (FontLoaded) {
                SetLoading(false);
            }
        })();
    }, [FontLoaded]);

    function onAuthenticated() {
        SetAuthenticated(true);
    }

    return (
        <>
            {(() => {
                if (Loading) {
                    return <LoadingScreen />;
                } else if (!Authenticated) {
                    return <LoginScreen onAuthenticated={onAuthenticated} />;
                } else {
                    return (
                        <EntriesProvider>
                            <UserProvider>
                                <NavigationContainer>
                                    <Navigator>
                                        <Screen
                                            component={HomeScreen}
                                            name="Willkommen"
                                            options={{
                                                tabBarIcon: ({
                                                    focused,
                                                    color,
                                                    size,
                                                }) => (
                                                    <Ionicons
                                                        name="school"
                                                        size={30}
                                                        color={
                                                            focused
                                                                ? "#a03bff"
                                                                : "#cccccc"
                                                        }
                                                    />
                                                ),
                                            }}
                                        />
                                        <Screen
                                            component={EntriesScreen}
                                            name="Zusammenfassungen"
                                            options={{
                                                tabBarIcon: ({
                                                    focused,
                                                    color,
                                                    size,
                                                }) => (
                                                    <Ionicons
                                                        name="book"
                                                        size={30}
                                                        color={
                                                            focused
                                                                ? "#a03bff"
                                                                : "#cccccc"
                                                        }
                                                    />
                                                ),
                                            }}
                                        />
                                    </Navigator>
                                </NavigationContainer>
                            </UserProvider>
                        </EntriesProvider>
                    );
                }
            })()}
            <StatusBar style="light" />
        </>
    );
}
