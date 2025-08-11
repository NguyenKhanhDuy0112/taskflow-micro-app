import { AuthUserEntity } from '../entities/auth-user.entity';
import { Email } from '../value-objects/email.vo';

export interface AuthUserRepositoryInterface {
    save(user: AuthUserEntity): Promise<AuthUserEntity>;
    findById(id: string): Promise<AuthUserEntity | null>;
    findByEmail(email: Email): Promise<AuthUserEntity | null>;
    exists(id: string): Promise<boolean>;
    existsByEmail(email: Email): Promise<boolean>;
}
