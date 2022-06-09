// TS
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";
import Skill from "@/models/Skill";

export default interface Build {
    id?: string;
    name: string;
    class: string;
    description: string;
    gear: BuildGear;
    cube: BuildCube;
    skills: Array<Skill | null>;
    passives: Array<Skill | null>;
    userId?: string | null;
}
