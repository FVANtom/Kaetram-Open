export default class Slot {
    public key = '';
    public count = -1;
    public name = '';

    public ability = -1;
    public abilityLevel = -1;
    public edible = false;
    public equippable = false;
    public soulBindable = false;
    public price = 0;

    public constructor(public index: number) {}

    public load(
        key = '',
        count: number,
        ability = -1,
        abilityLevel = -1,
        edible = false,
        equippable = false,
        name = '',
        price = 0,
        soulBindable = false
    ): void {
        this.key = key;
        this.count = count;
        this.name = name;
        this.ability = ability;
        this.abilityLevel = abilityLevel;

        this.edible = edible;
        this.equippable = equippable;
        this.price = price;
        this.soulBindable = soulBindable;
    }

    public empty(): void {
        this.key = '';
        this.count = -1;
        this.name = '';
        this.ability = -1;
        this.abilityLevel = -1;

        this.edible = false;
        this.equippable = false;
        this.price = 0;
        this.soulBindable = false;
    }

    public isEmpty(): boolean {
        return !this.key || this.count < 1;
    }

    public setCount(count: number): void {
        this.count = count;
    }
}
