import { useState, useCallback } from 'react';

interface UseApiState<T> {
    data: T | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | null;
}

export function useApi<T>() {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
    });

    const execute = useCallback(async (apiCall: () => Promise<T>) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            isSuccess: false,
            isError: false,
            error: null
        }));

        try {
            const data = await apiCall();
            setState({
                data,
                isLoading: false,
                isSuccess: true,
                isError: false,
                error: null,
            });
            return data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.error || error.message || 'Something went wrong';
            setState({
                data: null,
                isLoading: false,
                isSuccess: false,
                isError: true,
                error: errorMsg,
            });
            throw error;
        }
    }, []);

    const reset = useCallback(() => {
        setState({
            data: null,
            isLoading: false,
            isSuccess: false,
            isError: false,
            error: null,
        });
    }, []);

    return { ...state, execute, reset };
}