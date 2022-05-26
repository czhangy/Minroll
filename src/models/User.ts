// TS
import Build from "@/models/Build";

export default interface User {
    id: string;
    username: string;
    builds: Build[];
}
