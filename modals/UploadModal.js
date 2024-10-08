import { ActivityIndicator, Modal, Text, View } from "react-native";
import { ModalView } from "../components/ModalView";
import { Title } from "../components/Title";
import { Section } from "../components/Section";
import { Input, MediaInput } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { uploadEntry } from "../api";

export function UploadModal({ visible, onUploaded }) {
  const [UploadTitle, SetUploadTitle] = useState(undefined);
  const [UploadDescription, SetUploadDescription] = useState(undefined);
  const [Blobs, SetBlobs] = useState([]);
  const [Uploading, SetUploading] = useState(false);

  const Storage = getStorage(app);

  async function onUpload() {
    if (Blobs.length === 0) return;
    SetUploading(true);

    const promises = [];

    Blobs.forEach(async (blob) => {
      const StorageRef = ref(Storage, `images/${blob._data.blobId}.jpg`);
      promises.push(uploadBytes(StorageRef, blob));
    });

    await Promise.all(promises);

    await uploadEntry(
      Blobs.map((blob) => blob._data.blobId + ".jpg"),
      UploadDescription,
      UploadTitle
    );

    SetUploading(false);

    onUploaded();
  }

  return (
    <Modal animationType="slide" visible={visible}>
      <StatusBar style="dark" />
      <ModalView>
        <Title>Zusammenfassung hochladen</Title>
        <Section name="Details">
          <Input placeholder="Vektoren" setter={SetUploadTitle} title="Titel" />
          <Input
            placeholder="Zusammenfassung für den Test am 10.04.2024"
            setter={SetUploadDescription}
            title="Beschreibung"
          />
        </Section>
        <Section name="Material">
          <MediaInput onSelected={SetBlobs} />
        </Section>
        <View style={{ flexGrow: 1 }}></View>
        <Button border bg="white" fg="#a03bff" onPress={onUpload}>
          {Uploading ? (
            <ActivityIndicator color="#a03bff" size="small" />
          ) : (
            <Text>Hochladen</Text>
          )}
        </Button>
      </ModalView>
    </Modal>
  );
}
