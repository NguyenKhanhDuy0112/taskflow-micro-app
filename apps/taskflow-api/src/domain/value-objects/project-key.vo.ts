import { ValueObject } from './base/value-object.base';

export class ProjectKey extends ValueObject<string> {
    constructor(value: string) {
        super(value.toUpperCase().trim());
        this.validate();
    }

    private validate(): void {
        const keyRegex = /^[A-Z][A-Z0-9]{1,9}$/; // 2-10 chars, starts with letter
        if (!keyRegex.test(this.value)) {
            throw new Error('Project key must be 2-10 uppercase characters, starting with a letter');
        }
    }

    public static from(value: string): ProjectKey {
        return new ProjectKey(value);
    }

    public generateIssueKey(issueNumber: number): string {
        return `${this.value}-${issueNumber}`;
    }
}