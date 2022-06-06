// TS
import Rune from "@/models/Rune";

export default interface Skill {
    slug: string;
    icon: string;
    description: string;
    rune: Rune | null;
}
