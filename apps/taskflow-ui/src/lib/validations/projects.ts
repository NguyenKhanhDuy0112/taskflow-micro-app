import { hasLength, matches } from "@mantine/form";

export const projectValidators = {
    name: hasLength(
        { min: 2, max: 100 },
        'Project name must be 2-100 characters'
    ),
    key: matches(
        /^[A-Z][A-Z0-9]{1,9}$/,
        'Key must be 2-10 uppercase characters, starting with a letter'
    ),
    description: hasLength(
        { max: 500 },
        'Description cannot exceed 500 characters'
    ),
};