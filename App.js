import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import VarelaRound from "./assets/varela-round.ttf";
import { StatusBar } from "expo-status-bar";

import { LoadingScreen, HomeScreen, LoginScreen } from "./screens";
import { useFonts } from "expo-font";

import { Navigator, Screen } from "./components/TabNavigator";
import { isAuthenticated } from "./api";
import * as SecureStore from "expo-secure-store";

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
    }, [FontLoaded, Authenticated]);

    function onAuthenticated() {
        SetAuthenticated(isAuthenticated());
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
                        <>
                            <NavigationContainer>
                                <Navigator>
                                    <Screen
                                        component={HomeScreen}
                                        name="Willkommen"
                                    />
                                </Navigator>
                            </NavigationContainer>
                            <StatusBar style="light" />
                        </>
                    );
                }
            })()}
            <StatusBar style="light" />
        </>
    );
}
