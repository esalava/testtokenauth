'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosConfig from '@/services/base';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    try {
      const response = await axiosConfig.post('/api/session/login/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const {access_token} = response.data
      if (access_token) {
        localStorage.setItem('access_token', access_token);
        router.push('/web_app/dashboard');
      }
    } catch (error) {
      setServerError('Credenciales incorrectas o problema con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('username', { required: 'El nombre de usuario es requerido' })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('password', { required: 'La contraseña es requerida' })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />

        {serverError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {serverError}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>
    </Container>
  );
}
