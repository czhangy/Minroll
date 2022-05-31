// TS
import User from "@/models/User";

export default interface AuthContext {
    user: User | null;
    loginUser: any;
    logoutUser: any;
}
