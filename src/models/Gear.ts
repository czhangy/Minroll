// TS
import Set from "@/models/Set";
import Build from "@/models/Build";

export default interface Gear {
    id?: string;
    name: string;
    slot: string;
    category?: string;
    rarity: string;
    set?: Set;
    setId?: string;
    effect: string;
    description?: string;
    src: string;
    builds?: Build[];
}
