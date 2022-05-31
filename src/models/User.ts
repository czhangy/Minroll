// TS
import Build from "@/models/Build";

export default interface User {
    id?: string;
    email?: string;
    username: string;
    password?: string;
    confirmPassword?: string;
    builds?: Build[];
}
