"use client"

import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { useToken } from '@/services/tokenService/useToken';

const UseToken = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const { postTokenMutation, postTokenStatus, postTokenData } = useToken();

  const handleInputChange = (event) => {
    setTokenInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    postTokenMutation({ token: tokenInput });
  };

  useEffect(() => {
    if (postTokenStatus === 'success') {
      const {is_valid} = postTokenData.data;
      if (is_valid) {
        setMessage('Token used successfully!');
        setIsSuccess(true);
      } else {
        setMessage('Invalid token. Please try again.');
        setIsSuccess(false);
      }
    }
  }, [postTokenStatus]);

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter OTP Token"
            variant="outlined"
            value={tokenInput}
            onChange={handleInputChange}
            required
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <Button variant="contained" color="primary" type="submit">
            Use Token
          </Button>
        </form>
        {message && (
          <Typography
            variant="body1"
            sx={{ marginTop: 2, color: isSuccess ? 'green' : 'red' }}
          >
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UseToken;
