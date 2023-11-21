import { apiClient } from "./api-client"
import { useQuery } from '@tanstack/react-query';

const getListConceptFn = async () => {
    const response = await apiClient.get('concepts');
    return response.data;
}

export function useGetListConcept() {
    return useQuery({
        queryKey: ['concept'],
        queryFn: getListConceptFn,
    });
}
