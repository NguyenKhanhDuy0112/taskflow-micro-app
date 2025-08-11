import { ValueObject } from './base/value-object.base';

export class Email extends ValueObject<string> {
    constructor(value: string) {
        super(value.toLowerCase().trim());
        this.validate();
    }

    private validate(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            throw new Error('Invalid email format');
        }
    }

    public static from(value: string): Email {
        return new Email(value);
    }
}