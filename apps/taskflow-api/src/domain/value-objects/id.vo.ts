import { ValueObject } from './base/value-object.base';
import { randomUUID } from 'crypto';

export class Id extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.validate();
    }

    private validate(): void {
        if (!this.value || this.value.trim().length === 0) {
            throw new Error('ID cannot be empty');
        }
    }

    public static generate(): Id {
        return new Id(randomUUID());
    }

    public static from(value: string): Id {
        return new Id(value);
    }
}