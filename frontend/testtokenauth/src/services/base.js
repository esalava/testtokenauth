import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('access_token'); // get stored access token
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // set in header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default axiosConfig;
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
  
//         try {
//           const refreshToken = localStorage.getItem('refreshToken');
//           const response = await axios.post('/api/refresh-token', { refreshToken });
//           const { token } = response.data;
  
//           localStorage.setItem('token', token);
  
//           // Retry the original request with the new token
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return axios(originalRequest);
//         } catch (error) {
//           // Handle refresh token error or redirect to login
//         }
//       }
  
//       return Promise.reject(error);
//     }
// );