// React
import { createContext, useContext, useState } from "react";
// TS
import AuthContext from "@/models/AuthContext";
import User from "@/models/User";

const defaultValue = {
    user: null,
    loginUser: () => void 0,
    logoutUser: () => void 0,
};
const AuthContext = createContext<AuthContext>(defaultValue);

type Props = {
    value: User | null;
    children: any;
};

export const AuthProvider: React.FC<Props> = ({ value, children }: Props) => {
    const [user, setUser] = useState<User | null>(value);
    const loginUser = (user: User) => setUser(user);
    const logoutUser = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
