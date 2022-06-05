// TS
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";

export default interface Build {
    id: string;
    name: string;
    class: string;
    description: string;
    gear: BuildGear;
    cube: BuildCube;
    userId: string | null;
}
