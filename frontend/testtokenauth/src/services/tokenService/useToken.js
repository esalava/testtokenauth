import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginationStore } from "@/app/web_app/dashboard/stores/useTokensStore";
import {
    fetchGenerateToken,
    fetchTokens,
    postToken
} from "@/services/tokenService/tokenServices";

export const useToken = () => {
    const queryClient = useQueryClient();

    const {
        error: postTokenError,
        mutate: postTokenMutation,
        data: postTokenData,
        status: postTokenStatus
    } = useMutation({
        mutationFn: postToken,
        onSuccess: () => {
            queryClient.invalidateQueries(["allTokens"]);
        }
    })

    const {
        isLoading: isLoadingNewToken,
        data: newTokenData,
        error : newTokenError,
        refetch: refetchNewToken
    } = useQuery({
        queryKey: [{queryIdentifier: "generateToken"}],
        queryFn: fetchGenerateToken,
    })

    return {
        postTokenError,
        postTokenMutation,
        postTokenData,
        postTokenStatus,
        isLoadingNewToken,
        newTokenData,
        newTokenError,
        refetchNewToken
    }
}

export const useTokens = () => {
    const {page, rowsPerPage, count} = usePaginationStore();
    const {
        isLoading: isLoadingAllTokens,
        data: dataAllTokens,
        error : errorAllTokens,
        refetch: refetchAllTokens
    } = useQuery({
        queryKey: [{queryIdentifier: "allTokens", page, rowsPerPage, count}],
        queryFn: fetchTokens
    })

    return {
        isLoadingAllTokens,
        dataAllTokens,
        errorAllTokens,
        refetchAllTokens
    }
}