// TS
import Gear from "@/models/Gear";

export default interface BuildCube {
    weapon: Gear | null;
    armor: Gear | null;
    jewelry: Gear | null;
}
