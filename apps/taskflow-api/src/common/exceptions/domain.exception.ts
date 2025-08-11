export class DomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainException';
    }
}

export class EntityNotFoundException extends DomainException {
    constructor(entityName: string, id: string) {
        super(`${entityName} with id ${id} not found`);
        this.name = 'EntityNotFoundException';
    }
}

export class BusinessRuleViolationException extends DomainException {
    constructor(rule: string) {
        super(`Business rule violation: ${rule}`);
        this.name = 'BusinessRuleViolationException';
    }
}