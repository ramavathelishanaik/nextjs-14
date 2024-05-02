'use client';
import axios from 'axios';
// import {  useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiEndPoints from '../../../../services/apiEndPoints';

export const useForgotPassword = () => {
  // const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.FORGOT_PASSWORD}`;
  const config = 'null';


  const {
    mutate: forgotPassword,
    data,
    isLoading,
    isPending,
    isSuccess,
    reset 
  } = useMutation({
    mutationFn: async (email) => {
      const response = await axios.post(apiUrl, { email }, config);
      return response;
    },
    onSuccess: (response) => {
      const data = response?.data;
      toast.success(data?.message);
      // router.push('/auth/login')

    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return { forgotPassword, data, isLoading, isPending,isSuccess,reset };
};
