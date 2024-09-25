'use client';

import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/services/loginService/useLogin';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { loginMutation, dataLogin,  loginError, statusLogin} = useLogin();

  const onSubmit = async (data) => {
    loginMutation(data);
    if (loginError) {
      setServerError('Credenciales incorrectas o problema con el servidor');
      return;
    }    
  };

  useEffect(() => {
    if (statusLogin === 'success') {
      const {access_token} = dataLogin.data
      if (access_token) {
        localStorage.setItem('access_token', access_token);
        router.push('/web_app/dashboard');
      }
    }
  }, [statusLogin])

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
          Login
        </Button>
      </Box>
    </Container>
  );
}
