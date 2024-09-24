'use client';

import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import axiosConfig from '@/services/base';

export default function CurrentToken() {
  const [token, setToken] = useState('');
  const [expirationTime, setExpirationTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get('/api/session/otp/generarToken/');
      const { token, time_remaining } = response.data;
      setToken(token);
      setExpirationTime(time_remaining);
    } catch (error) {
      console.error('Error al generar el token', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
    const interval = setInterval(() => {
      setExpirationTime((prevTime) => {
        if (prevTime <= 1) {
          fetchToken();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const expirationProgress = (expirationTime / 60) * 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      <Typography variant="h5">Token OTP</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            {token}
          </Typography>
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={(expirationProgress > 0) ? expirationProgress : 100}
              size={100}
              color="secondary"
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" component="div" color="textSecondary">
                {Math.round(expirationTime)}s
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
