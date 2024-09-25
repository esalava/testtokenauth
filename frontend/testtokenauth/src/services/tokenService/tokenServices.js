import axiosConfig from '@/services/base';

export const fetchTokens = async ({queryKey}) => {
    const {page, rowsPerPage} = queryKey[0];
    const response = await axiosConfig.get(`/api/session/otp/token/all/?page=${page + 1}&limit=${rowsPerPage}`);
    return response.data || []; 
}

export const postToken = async (data) => {
    const {token} = data;
    const response = await axiosConfig.post(`/api/session/otp/usarToken/?otp=${token}`);
    return response || null
}

export const fetchGenerateToken = async ({queryKey}) => {
    const response = await axiosConfig.get("/api/session/otp/generarToken/");
    return response.data|| null
}