// TS
import User from "@/models/User";
import Gear from "@/models/Gear";

export default interface Build {
    id?: string;
    name: string;
    class: string;
    description?: string;
    gear: Gear[];
    User?: User;
    userId?: string | null;
}
