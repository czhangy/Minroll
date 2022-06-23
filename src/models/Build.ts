// TS
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";
import Skill from "@/models/Skill";
import Gem from "@/models/Gem";

export default interface Build {
    id?: string;
    name: string;
    class: string;
    description?: string;
    gear?: BuildGear | String[];
    cube?: BuildCube | String[];
    skills?: Array<Skill | null> | String[];
    data?: string;
    passives?: Array<Skill | null> | String[];
    gems?: Array<Gem | null> | String[];
    userId?: string | null;
}
