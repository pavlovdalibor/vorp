import { StyleSheet, Text, View } from "react-native";
import { ScreenView } from "../components/ScreenView";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { LoadingScreen } from "./LoadingScreen";
import { Tag } from "../components/Tag";
import { Title } from "../components/Title";

export function HomeScreen() {
    const user = useContext(UserContext);

    if (!user) return <LoadingScreen />;

    return (
        <ScreenView>
            <View style={styles.info}>
                <Title>{user.name}</Title>
                <Tag style={{alignSelf: "flex-start"}}>Klasse {user.class.name}</Tag>
            </View>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 36,
        fontWeight: "bold",
    },
    class: {
        color: "gray",
        backgroundColor: "#a03bff",
        borderRadius: 6,
    },
});
