import { StyleSheet, Text, View } from "react-native";
import { ScreenView } from "../components/ScreenView";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { LoadingScreen } from "./LoadingScreen";
import { Tag } from "../components/Tag";
import { Title } from "../components/Title";
import { Entry } from "../components/Entry";
import { getLatest } from "../api";
import * as SecureStore from "expo-secure-store";

export function HomeScreen() {
  const user = useContext(UserContext);
  const [latestEntry, setLatestEntry] = useState(undefined);

  useEffect(() => {
    (async () => {
      const latest = await getLatest();

      setLatestEntry(latest);
    })();
  }, []);

  if (!user) return <LoadingScreen />;

  return (
    <ScreenView>
      <View style={styles.info}>
        <Title>{user.name}</Title>
        <Tag style={{ alignSelf: "flex-start" }}>Klasse {user.class.name}</Tag>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "500" }}>Neuester Eintrag</Text>
      {latestEntry === undefined ? (
        <Text>Keine Einträge gefunden</Text>
      ) : (
        <Entry entry={latestEntry} />
      )}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 36,
    fontWeight: "bold",
  },
  info: {
    gap: 10,
  },
  class: {
    color: "gray",
    backgroundColor: "#a03bff",
    borderRadius: 6,
  },
});
