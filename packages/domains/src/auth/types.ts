import { RegisterRequest, User } from './models';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}