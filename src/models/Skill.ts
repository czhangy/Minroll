// TS
import Rune from "@/models/Rune";

export default interface Skill {
    name: string;
    slug: string;
    icon: string;
    description: string;
    rune: Rune | null;
    runeList: Rune[] | null;
}
