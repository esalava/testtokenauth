'use client';

import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useToken } from '@/services/tokenService/useToken';
import { useTokens } from '@/services/tokenService/useToken';

export default function CurrentToken() {
  const [token, setToken] = useState('');
  const [expirationTime, setExpirationTime] = useState(0);
  const {refetchAllTokens} = useTokens();

  const {
    newTokenData,
    refetchNewToken,
    isLoadingNewToken
  } = useToken();

  const handleNewToken = () => {
    if (newTokenData) {
      const {token, time_remaining} = newTokenData 
      setToken(token);
      setExpirationTime(time_remaining);
    }
  };

  useEffect(() => {
    refetchNewToken();
    const interval = setInterval(() => {
      setExpirationTime((prevTime) => {
        if (prevTime <= 1) {
          refetchNewToken();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [refetchNewToken]);

  useEffect(() => {
    handleNewToken();
    refetchAllTokens();
  }, [newTokenData]);

  if (isLoadingNewToken) {
    return <CircularProgress />;
  }
  
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

      {isLoadingNewToken ? (
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
