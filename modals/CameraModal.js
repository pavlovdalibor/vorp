import { Modal, StyleSheet, View, Text, Image } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Title } from "../components/Title";
import Constants from "expo-constants";
import { ModalView } from "../components/ModalView";
import { Button } from "../components/Button";
import { Section } from "../components/Section";
import { StatusBar } from "expo-status-bar";

export function CameraModal({ visible, onPhotosTaken }) {
    const [Photos, SetPhotos] = useState([]);
    const [Blobs, SetBlobs] = useState([]);
    const CameraRef = useRef();

    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
        })();
    });

    async function onPhotoTaken() {
        const { uri } = await CameraRef.current.takePictureAsync();
        const blob = await uriToBlob(uri);

        SetBlobs([blob, ...Blobs]);
        SetPhotos([uri, ...Photos]);
    }

    function onFinished() {
        const blobs = Blobs;
        const photos = Photos;

        SetBlobs([]);
        SetPhotos([]);

        onPhotosTaken(photos, blobs);
    }

    async function uriToBlob(uri) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(new Blob([xhr.response], { type: "image/jpeg" }));
            };
            xhr.onerror = function () {
                reject(new Error("Failed to fetch image."));
            };
            xhr.open("GET", uri, true);
            xhr.responseType = "blob";
            xhr.send(null);
        });
    }

    return (
        <Modal visible={visible} animationType="slide">
            <StatusBar style="dark" />
            <ModalView>
                <Title>Material fotografieren</Title>
                <View style={styles.cameraHolder}>
                    <Camera ref={CameraRef} style={styles.camera}></Camera>
                </View>
                <Section scroll name="Fotos">
                    {Photos.length === 0 ? (
                        <Text>Noch keine Fotos</Text>
                    ) : (
                        <View style={styles.photos}>
                            {Photos.map((photo) => {
                                return (
                                    <Image
                                        style={styles.photo}
                                        key={photo}
                                        src={photo}
                                    />
                                );
                            })}
                        </View>
                    )}
                </Section>
                <View style={styles.buttons}>
                    <Button flex onPress={onPhotoTaken}>
                        <Text>Fotografieren</Text>
                    </Button>
                    <Button
                        onPress={onFinished}
                        flex
                        border
                        bg="white"
                        fg="#a03bff"
                    >
                        <Text>Fertig</Text>
                    </Button>
                </View>
            </ModalView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    camera: {
        flexGrow: 1,
    },
    cameraHolder: {
        flexGrow: 1,
        borderRadius: 8,
        overflow: "hidden",
    },
    photos: {
        flexDirection: "row",
        gap: 5,
        height: 80,
    },
    photo: {
        width: 50,
        borderRadius: 8,
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
    },
});
