import { apiClient } from "./api-client";
import { useQuery } from '@tanstack/react-query';

const getInputFn = async () => {
    const response = await apiClient.get('inputs');
    return response.data;
};

export function useGetInputs() {
    return useQuery({
        queryKey: ['images'],
        queryFn: getInputFn,
    });
}
