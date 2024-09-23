'use client';
import { useRouter } from 'next/navigation';
import axiosConfig from '@/services/base';

export default function LoginPage() {
    const router = useRouter()
   
    async function handleSubmit(event) {
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget)
      const username = formData.get('username')
      const password = formData.get('password')
   
      const response = await axiosConfig.post('/api/session/login/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,  
      })
    }
   
    return (
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    )
  }