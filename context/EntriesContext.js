import { getItem } from "expo-secure-store";
import { createContext, useState, useEffect } from "react";
import { getEntries } from "../api";

export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
    const [entries, setEntries] = useState(undefined);

    useEffect(() => {
        fetchEntries();
    }, []);

    async function fetchEntries() {
        try {
            const fetchedEntries = await getEntries();
            setEntries(fetchedEntries);
        } catch (error) {
            console.error("Error fetching entry data:", error);
        }
    }

    async function refreshEntries() {
        await fetchEntries();
    }

    return (
        <EntriesContext.Provider value={{ entries, refreshEntries }}>
            {children}
        </EntriesContext.Provider>
    );
}
