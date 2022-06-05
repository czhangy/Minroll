// TS
import Gear from "@/models/Gear";

export default interface BuildGear {
    head: Gear | null;
    shoulders: Gear | null;
    torso: Gear | null;
    hands: Gear | null;
    wrists: Gear | null;
    waist: Gear | null;
    legs: Gear | null;
    feet: Gear | null;
    neck: Gear | null;
    "left-finger": Gear | null;
    "right-finger": Gear | null;
    "main-hand": Gear | null;
    "off-hand": Gear | null;
}
