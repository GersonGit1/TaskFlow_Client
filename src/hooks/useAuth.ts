import { useQuery } from "@tanstack/react-query"
import { getUser } from "../services/AuthApi";

export const useAuth = () => {
    const token = localStorage.getItem('uptask_token');
    const {data, isError, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!token
    });

    return {data, isError, isLoading, hasToken: !!token};
}