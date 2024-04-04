import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
    Pressable,
} from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { EntryDetailsModal } from "../modals/EntryDetailsModal";
import { Ionicons } from "@expo/vector-icons";

export function Entry({ entry }) {
    const { author, description, title, blobIds } = entry;
    const [PreviewUrl, SetPreviewUrl] = useState(undefined);
    const [EntryModalVisible, SetEntryModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const url = await getPreviewImage();
            SetPreviewUrl(url);
        })();
    }, [PreviewUrl]);

    async function getPreviewImage() {
        const Storage = getStorage(app);
        const Ref = ref(Storage, "images/" + blobIds[0]);
        const Url = await getDownloadURL(Ref);

        return Url;
    }

    return (
        <Pressable
            onPress={() => {
                SetEntryModalVisible(true);
            }}
            style={styles.entry}
        >
            <EntryDetailsModal
                onClose={() => {
                    SetEntryModalVisible(false);
                }}
                visible={EntryModalVisible}
                entry={entry}
            />
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title}</Text>
                <Text>{description}</Text>
                <Text style={styles.author}>Von {author}</Text>
            </View>
            <View style={styles.imgWrapper}>
                {PreviewUrl ? (
                    <Image style={styles.image} source={{ uri: PreviewUrl }} />
                ) : (
                    <ActivityIndicator color="#a03bff" size="small" />
                )}
            </View>
            <View style={styles.imgWrapper}>
                <Ionicons name="arrow-forward" size={20} color="#a03bff" />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
        gap: 5,
    },
    imgWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    entry: {
        padding: 10,
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: "row",
        gap: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#a03bff",
    },
    author: {
        fontSize: 12,
        color: "gray",
    },
    image: { flexGrow: 1, width: 50, borderRadius: 8 },
});
