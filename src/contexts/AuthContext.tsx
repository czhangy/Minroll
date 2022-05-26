// React
import { createContext, useContext, useState, useEffect } from "react";
// TS
import AuthContext from "@/models/AuthContext";
import User from "@/models/User";
import { Context } from "react";

// Set default context
const AuthContext: Context<AuthContext | null> =
    createContext<AuthContext | null>(null);

type Props = {
    value: User | null;
    children: any;
};

export const AuthProvider: React.FC<Props> = ({ value, children }) => {
    // Define global state
    const [user, setUser] = useState<User | null>(value);
    const loginUser = (user: User) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };
    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Pull user from local storage if possible
    useEffect(() => {
        if (typeof window !== "undefined")
            setUser(JSON.parse(localStorage.getItem("user") as string) || null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
