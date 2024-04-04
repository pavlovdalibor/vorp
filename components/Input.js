import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CameraModal } from "../modals/CameraModal";
import { Section } from "./Section";

export function Input({ title, placeholder, setter, hidden }) {
    return (
        <View style={styles.input}>
            <Text>{title}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                onChangeText={setter}
                secureTextEntry={hidden}
            />
        </View>
    );
}

export function MediaInput({ onSelected }) {
    const [CameraVisible, SetCameraVisible] = useState(false);
    const [Photos, SetPhotos] = useState([]);
    const [Blobs, SetBlobs] = useState([]);

    function onPhotosTaken(photos, blobs) {
        SetPhotos(photos);
        SetBlobs(blobs);

        onSelected(blobs);

        SetCameraVisible(false);
    }

    return (
        <>
            <CameraModal
                onPhotosTaken={onPhotosTaken}
                visible={CameraVisible}
            />
            {Photos.length === 0 || Blobs.length === 0 ? (
                <View style={styles.mediaInput}>
                    <Pressable
                        style={styles.mediaButton}
                        onPress={() => {
                            SetCameraVisible(true);
                        }}
                    >
                        <Ionicons name="camera" size={24} color="white" />
                        <Text style={styles.mediaText}>Fotografieren</Text>
                    </Pressable>
                    <Pressable style={styles.mediaButton}>
                        <Ionicons name="image" size={24} color="white" />
                        <Text style={styles.mediaText}>Auswählen</Text>
                    </Pressable>
                </View>
            ) : (
                <Section scroll name="Fotos">
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
                </Section>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        gap: 5,
    },
    textInput: {
        padding: 10,
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 8,
    },
    mediaButton: {
        borderRadius: 8,
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: "#a03bff",
        gap: 5,
    },
    mediaText: {
        color: "white",
    },
    mediaInput: {
        flexDirection: "row",
        gap: 10,
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
});
