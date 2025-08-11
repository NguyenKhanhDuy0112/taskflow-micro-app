export abstract class ValueObject<T> {
    constructor(protected readonly value: T) { }

    public getValue(): T {
        return this.value;
    }

    public equals(vo: ValueObject<T>): boolean {
        return JSON.stringify(this.value) === JSON.stringify(vo.value);
    }
}