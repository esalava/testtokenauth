import { useMutation } from "@tanstack/react-query"
import { postLogin } from "@/services/loginService/loginServices"

export const useLogin = () => {
    const {
        error: loginError,
        mutate: loginMutation,
        data: dataLogin,
        status: statusLogin
    } = useMutation({
        mutationFn: postLogin
    })

    return {
        loginMutation,
        statusLogin,
        dataLogin,
        loginError
    }
}