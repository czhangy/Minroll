import User from "@/models/User";
import { Dispatch } from "react";

export default interface AuthContext {
    user: User | null;
    loginUser: any;
    logoutUser: any;
}
