import { getItem } from "expo-secure-store";
import { createContext, useState, useEffect } from "react";
import { getUserByEmail, getClassById } from "../api";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [User, SetUser] = useState(undefined);

    useEffect(() => {
        (async () => {
            try {
                const email = getItem("authentication");
                const user = await getUserByEmail(email);
                const userClass = await getClassById(user.class);

                SetUser({
                    name: user.name,
                    email: user.email,
                    class: {
                        name: userClass.name,
                        teacher: userClass.teacher,
                    },
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    return <UserContext.Provider value={User}>{children}</UserContext.Provider>;
}
