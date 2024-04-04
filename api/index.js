// index.js
// firebase api

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const DB = "https://vorp-2e1d6-default-rtdb.europe-west1.firebasedatabase.app/";

async function getUserByEmail(email) {
    try {
        const response = await axios.get(
            `${DB}users.json?orderBy="email"&equalTo="${email}"`
        );

        if (response.status === 200) {
            return Object.values(response.data)[0];
        }
    } catch (err) {
        console.log(err);
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
