// TabNavigator.js
// Customized native Tab Navigator

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const TabNavigator = createBottomTabNavigator();

export const Screen = TabNavigator.Screen;

export function Navigator({ children }) {
    return (
        <TabNavigator.Navigator screenOptions={screenOptions}>
            {children}
        </TabNavigator.Navigator>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: "#a03bff",
    },
    headerTitleStyle: {
        color: "white",
    },
};
