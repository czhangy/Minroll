// TS
import CurrentUser from "@/models/CurrentUser";

export default interface AuthContext {
    user: CurrentUser | null;
    loginUser: any;
    logoutUser: any;
}
