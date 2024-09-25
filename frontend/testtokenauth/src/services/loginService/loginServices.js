import axiosConfig from '@/services/base';

export const postLogin = async (data) => {
    const response = await axiosConfig.post('/api/session/login/', data, {
        headers: {
            'Content-Type': 'application/json',
          },
        withCredentials: true,
    })
    return response || null;
}
