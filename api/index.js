// index.js
// firebase api

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const DB = "https://vorp-2e1d6-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getEntries() {
    try {
        const response = await axios.get(`${DB}entries.json`);

        if (response.status === 200) {
            return Object.keys(response.data).map((key) => ({
                id: key,
                ...response.data[key],
            }));
        }
    } catch (err) {
        console.log("Error getting entries: " + err);
    }
}

export async function uploadEntry(blobIds, description, title) {
    try {
        const { name } = await getUserByEmail(
            SecureStore.getItem("authentication")
        );
        const data = {
            blobIds,
            description,
            title,
            author: name,
        };

        await axios.post(`${DB}entries.json`, data);
    } catch (err) {
        console.log("Error uploading entry: " + err);
    }
}

export async function getUserById(id) {
    try {
        const response = await axios.get(`${DB}users/${id}.json`);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.log("Error getting user class by id: " + err);
    }
}

export async function getClassById(id) {
    try {
        const response = await axios.get(`${DB}classes/${id}.json`);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.log("Error getting user class by id: " + err);
    }
}

export async function getUserByEmail(email) {
    try {
        const response = await axios.get(
            `${DB}users.json?orderBy="email"&equalTo="${email}"`
        );

        if (response.status === 200) {
            return {
                id: Object.keys(response.data)[0],
                ...Object.values(response.data)[0],
            };
        }
    } catch (err) {
        console.log("Error getting user by email: " + err);
    }
}

export function isAuthenticated() {
    return SecureStore.getItem("authentication") !== null;
}

export async function login(email, password) {
    try {
        const user = await getUserByEmail(email);

        if (!user) return { error: "Benutzer existiert nicht." };

        const authenticated = password === user.password;

        if (authenticated) {
            SecureStore.setItem("authentication", email);
            return { success: "Erfolgreich eingeloggt." };
        }
    } catch (err) {
        return { error: "Ein Fehler ist aufgetreten." };
    }
}
