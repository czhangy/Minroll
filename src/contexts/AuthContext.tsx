// React
import { createContext, useContext, useState, useEffect } from "react";
// TS
import AuthContext from "@/models/AuthContext";
import CurrentUser from "@/models/CurrentUser";
import { Context } from "react";

// Set default context
const AuthContext: Context<AuthContext | null> =
    createContext<AuthContext | null>(null);

type Props = {
    value: CurrentUser | null;
    children: any;
};

export const AuthProvider: React.FC<Props> = ({ value, children }) => {
    // Context state
    const [user, setUser] = useState<CurrentUser | null>(value);

    // Auth state modifiers => called on login/logout
    const loginUser = (user: CurrentUser) => {
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

// Export hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
