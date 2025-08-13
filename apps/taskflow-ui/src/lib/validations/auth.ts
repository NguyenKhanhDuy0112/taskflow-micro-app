import { isEmail, hasLength } from '@mantine/form';

export const authValidators = {
    email: isEmail('Please enter a valid email'),
    password: hasLength({ min: 6 }, 'Password must be at least 6 characters'),
    name: hasLength({ min: 2 }, 'Name must be at least 2 characters'),
};