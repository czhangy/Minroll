// TS
import Gear from "@/models/Gear";

export default interface Set {
    id: string;
    name: string;
    twoPc: string[];
    threePc: string[];
    fourPc: string[];
    sixPc: string[];
    items: Gear[];
}
