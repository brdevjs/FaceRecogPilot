import { apiClient } from "./api-client"
import { useQuery } from '@tanstack/react-query';

const searchByConcepts = async () => {
    const response = await apiClient.post('annotations/searches', {
        "searches": [
            {
                "query": {
                    "filters": [
                        {
                            "annotation": {
                                "data": {
                                    "concepts": [
                                        {
                                            "id": "nick-vujicic",
                                            "value": 1
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    });
    return response.data;
}

export function useSearchByConcept() {
    return useQuery({
        queryKey: ['search'],
        queryFn: searchByConcepts,
    });
}
