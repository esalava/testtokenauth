"use client"

import { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';
import axiosConfig from '@/services/base';

const UseToken = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const handleInputChange = (event) => {
    setTokenInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await axiosConfig.post(`/api/session/otp/usarToken/?otp=${tokenInput}`);
      const { is_valid } = response.data;

      if (is_valid) {
        setMessage('Token used successfully!');
        setIsSuccess(true);
      } else {
        setMessage('Invalid token. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Error while using the token. Please try again later.');
      setIsSuccess(false);
    }
  };

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
