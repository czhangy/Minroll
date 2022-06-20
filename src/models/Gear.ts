export default interface Gear {
    id: string;
    name: string;
    slot: string;
    category: string;
    rarity: string;
    setId: string | null;
    effect: string | null;
    description: string;
    src: string;
}
