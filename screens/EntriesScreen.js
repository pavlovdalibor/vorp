import { ScreenView } from "../components/ScreenView";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UploadModal } from "../modals/UploadModal";
import { EntriesContext } from "../context/EntriesContext";
import { Entry } from "../components/Entry";

export function EntriesScreen() {
    const [UploadModalVisible, SetUploadModalVisible] = useState(false);
    const { entries, refreshEntries } = useContext(EntriesContext);

    return (
        <>
            <UploadModal
                onUploaded={async () => {
                    await refreshEntries();
                    SetUploadModalVisible(false);
                }}
                visible={UploadModalVisible}
            />
            <ScreenView>
                <View style={styles.entriesScreen}>
                    {entries === undefined ? (
                        <Text>Keine Einträge gefunden!</Text>
                    ) : (
                        <View style={styles.entriesScreen}>
                            {entries.map((entry) => {
                                return <Entry key={entry.id} entry={entry} />;
                            })}
                        </View>
                    )}
                </View>
                <View>
                    <Button
                        onPress={async () => {
                            SetUploadModalVisible(true);
                        }}
                        border
                        bg="white"
                        fg="#a03bff"
                    >
                        <Ionicons name="cloud-upload" size={24} />
                        <Text>Neue Zusammenfassung Hochladen</Text>
                    </Button>
                </View>
            </ScreenView>
        </>
    );
}

const styles = StyleSheet.create({
    entriesScreen: {
        flexGrow: 1,
        gap: 10,
    },
});
