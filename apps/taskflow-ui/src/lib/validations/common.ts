export const customValidators = {
    projectKey: (value: string) => {
        if (!value) return 'Project key is required';
        if (!/^[A-Z][A-Z0-9]{1,9}$/.test(value)) {
            return 'Key must be 2-10 uppercase characters, starting with a letter';
        }
        return null;
    },

    strongPassword: (value: string) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return 'Password must contain uppercase, lowercase and number';
        }
        return null;
    },
};