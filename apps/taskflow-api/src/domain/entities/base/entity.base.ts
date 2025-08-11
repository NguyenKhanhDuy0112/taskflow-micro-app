export abstract class BaseEntity {
    constructor(protected readonly _id: string) { }

    public getId(): string {
        return this._id;
    }

    public equals(entity: BaseEntity): boolean {
        return this._id === entity._id;
    }
}