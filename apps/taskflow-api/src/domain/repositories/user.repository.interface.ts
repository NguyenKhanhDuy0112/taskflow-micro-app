import { UserEntity } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';

export interface UserRepositoryInterface {
    save(user: UserEntity): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: Email): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
}