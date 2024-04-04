import { ActivityIndicator, Modal, Text } from "react-native";
import { ModalView } from "../components/ModalView";
import { Title } from "../components/Title";
import { StatusBar } from "expo-status-bar";
import { ImageCarousel } from "../components/ImageCarousel";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";

export function EntryDetailsModal({ visible, entry, onClose }) {
    const { title, description, author, blobIds } = entry;
    const storage = getStorage(app);
    const [uris, setUris] = useState(undefined);

    useEffect(() => {
        (async () => {
            const newUris = [];
            blobIds.map(async (blobId) => {
                const storageRef = ref(storage, `images/${blobId}`);
                const uri = await getDownloadURL(storageRef);
                newUris.push(uri);
            });

            setUris(newUris);
        })();
    }, []);

    return (
        <Modal animationType="slide" visible={visible}>
            <StatusBar style="dark" />
            <ModalView>
                <Text>{author}</Text>
                <Title>{title}</Title>
                <Text>{description}</Text>
                {uris === undefined ? (
                    <ActivityIndicator color="#a03bff" size="large" />
                ) : (
                    <ImageCarousel uris={uris} />
                )}
                <Button onPress={onClose}>
                    <Text>Schliessen</Text>
                </Button>
            </ModalView>
        </Modal>
    );
}
